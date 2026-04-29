import { useEffect, useState } from "react";
import type { CardsType, DeckType } from "../types/CardsType";
import { DeckList } from "../components/flashcards/DeckList";
import { DeckModal } from "../components/flashcards/modals/DeckModal";
import { CardModal } from "../components/flashcards/modals/CardModal";
import { StudyModal } from "../components/flashcards/modals/StudyModal";

export const FlashCards = () => {
  const [deck, setDeck] = useState<DeckType[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("deck");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cards, setCards] = useState<CardsType[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("card");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModal, setIsModal] = useState(false);
  const [deckCard, setDeckCard] = useState<"deck" | "card" | "study">("deck");
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  const [deckTitle, setDeckTitle] = useState("");
  const [cardFront, setCardFront] = useState("");
  const [cardVerse, setCardVerse] = useState("");

  const [editingDeckId, setEditingDeckId] = useState<number | null>(null);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const [studyIndex, setStudyIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null,
  );

  useEffect(() => {
    localStorage.setItem("deck", JSON.stringify(deck));
    localStorage.setItem("card", JSON.stringify(cards));
  }, [cards, deck]);

  const resetForm = () => {
    setDeckTitle("");
    setCardFront("");
    setCardVerse("");
    setEditingDeckId(null);
    setEditingCardId(null);
  };

  const closeModal = () => {
    setIsModal(false);
    setStudyIndex(0);
    setShowAnswer(false);
    setSelectedDifficulty(null);
    resetForm();
  };

  // ── DECK ──────────────────────────────────────────
  const handleOpenCreateDeck = () => {
    resetForm();
    setDeckCard("deck");
    setIsModal(true);
  };

  const handleOpenEditDeck = (d: DeckType) => {
    setDeckTitle(d.title);
    setEditingDeckId(d.id);
    setSelectedDeckId(d.id);
    setDeckCard("deck");
    setIsModal(true);
  };

  const handleSaveDeck = () => {
    if (!deckTitle.trim()) return;
    if (editingDeckId !== null) {
      setDeck((prev) =>
        prev.map((d) =>
          d.id === editingDeckId ? { ...d, title: deckTitle.trim() } : d,
        ),
      );
    } else {
      setDeck((prev) => [...prev, { id: Date.now(), title: deckTitle.trim() }]);
    }
    closeModal();
  };

  const handleDeleteDeck = (id: number) => {
    setDeck((prev) => prev.filter((d) => d.id !== id));
    setCards((prev) => prev.filter((c) => c.deckId !== id));
  };

  // ── CARD ──────────────────────────────────────────
  const handleOpenCreateCard = (deckId: number) => {
    resetForm();
    setSelectedDeckId(deckId);
    setDeckCard("card");
    setIsModal(true);
  };

  // Abre o CardModal já preenchido — volta para DeckModal ao cancelar
  const handleOpenEditCard = (card: CardsType) => {
    setCardFront(card.front);
    setCardVerse(card.verse);
    setEditingCardId(card.id);
    setDeckCard("card");
  };

  const handleSaveCard = () => {
    if (!cardFront.trim() || !cardVerse.trim() || selectedDeckId === null)
      return;

    if (editingCardId !== null) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === editingCardId
            ? {
                ...c,
                front: cardFront.trim(),
                verse: cardVerse.trim(),
                title: cardFront.trim(),
              }
            : c,
        ),
      );
      // volta para o DeckModal após salvar edição
      setCardFront("");
      setCardVerse("");
      setEditingCardId(null);
      setDeckCard("deck");
    } else {
      const newCard: CardsType = {
        id: Date.now(),
        deckId: selectedDeckId,
        title: cardFront.trim(),
        front: cardFront.trim(),
        verse: cardVerse.trim(),
        difficulty: 5,
      };
      setCards((prev) => [...prev, newCard]);
      closeModal();
    }
  };

  const handleDeleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCancelCard = () => {
    setCardFront("");
    setCardVerse("");
    setEditingCardId(null);
    // se estava editando um card, volta para o DeckModal
    if (editingCardId !== null) {
      setDeckCard("deck");
    } else {
      closeModal();
    }
  };

  // ── ESTUDO ──────────────────────────────────────────
  const handleOpenStudy = (deckId: number) => {
    setSelectedDeckId(deckId);
    setStudyIndex(0);
    setShowAnswer(false);
    setSelectedDifficulty(null);
    setDeckCard("study");
    setIsModal(true);
  };

  const studyCards = cards
    .filter((c) => c.deckId === selectedDeckId)
    .sort((a, b) => a.difficulty - b.difficulty);

  const handleNextCard = () => {
    if (selectedDifficulty !== null && studyCards[studyIndex]) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === studyCards[studyIndex].id
            ? { ...c, difficulty: selectedDifficulty }
            : c,
        ),
      );
    }
    setShowAnswer(false);
    setSelectedDifficulty(null);
    setStudyIndex((prev) => prev + 1);
  };

  const selectedDeck = deck.find((d) => d.id === selectedDeckId);
  const deckCards = cards.filter((c) => c.deckId === selectedDeckId);

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-3xl mx-auto space-y-6">
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Seus Decks</h2>
        <button
          onClick={handleOpenCreateDeck}
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Criar Deck
        </button>
      </section>

      <DeckList
        deck={deck}
        cards={cards}
        onStudy={handleOpenStudy}
        onEditDeck={handleOpenEditDeck}
        onAddCard={handleOpenCreateCard}
        onDeleteDeck={handleDeleteDeck}
      />

      {isModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-5 space-y-4 relative">
            {deckCard === "deck" && (
              <DeckModal
                deckTitle={deckTitle}
                isEditing={editingDeckId !== null}
                deckCards={deckCards}
                onChange={setDeckTitle}
                onSave={handleSaveDeck}
                onCancel={closeModal}
                onEditCard={handleOpenEditCard}
                onDeleteCard={handleDeleteCard}
              />
            )}

            {deckCard === "card" && (
              <CardModal
                cardFront={cardFront}
                cardVerse={cardVerse}
                isEditing={editingCardId !== null}
                onChangeFront={setCardFront}
                onChangeVerse={setCardVerse}
                onSave={handleSaveCard}
                onCancel={handleCancelCard}
              />
            )}

            {deckCard === "study" && (
              <StudyModal
                selectedDeck={selectedDeck}
                studyCards={studyCards}
                studyIndex={studyIndex}
                showAnswer={showAnswer}
                selectedDifficulty={selectedDifficulty}
                onShowAnswer={() => setShowAnswer(true)}
                onSelectDifficulty={setSelectedDifficulty}
                onNext={handleNextCard}
                onRestart={() => {
                  setStudyIndex(0);
                  setShowAnswer(false);
                  setSelectedDifficulty(null);
                }}
                onCancel={closeModal}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
};
