import type { CardsType, DeckType } from "../../types/CardsType";

type Props = {
  deck: DeckType[];
  cards: CardsType[];
  onStudy: (deckId: number) => void;
  onEditDeck: (deck: DeckType) => void;
  onAddCard: (deckId: number) => void;
  onDeleteDeck: (deckId: number) => void;
};

export const DeckList = ({
  deck,
  cards,
  onStudy,
  onEditDeck,
  onAddCard,
  onDeleteDeck,
}: Props) => {
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
      {deck.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-6">
          Nenhum deck criado ainda
        </p>
      ) : (
        deck.map((d) => (
          <div
            key={d.id}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            <button
              onClick={() => onStudy(d.id)}
              className="text-sm text-gray-800 text-left"
            >
              {d.title}
              <span className="ml-2 text-xs text-gray-400">
                ({cards.filter((c) => c.deckId === d.id).length} cards)
              </span>
            </button>

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => onEditDeck(d)}
                className="text-gray-500 cursor-pointer hover:text-blue-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => onAddCard(d.id)}
                className="text-gray-400 size-7 cursor-pointer hover:text-blue-500 transition font-bold"
              >
                +
              </button>
              <button
                onClick={() => onDeleteDeck(d.id)}
                className="text-gray-400 size-7 cursor-pointer hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
