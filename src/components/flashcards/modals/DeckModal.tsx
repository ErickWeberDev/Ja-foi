import type { CardsType } from "../../../types/CardsType";

type Props = {
  deckTitle: string;
  isEditing: boolean;
  deckCards: CardsType[];
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEditCard: (card: CardsType) => void;
  onDeleteCard: (id: number) => void;
};

export const DeckModal = ({
  deckTitle,
  isEditing,
  deckCards,
  onChange,
  onSave,
  onCancel,
  onEditCard,
  onDeleteCard,
}: Props) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Editar Deck" : "Novo Deck"}
        </h2>
        <p className="text-sm text-gray-500">Dê um nome ao seu deck</p>
      </div>

      <input
        type="text"
        value={deckTitle}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: Matemática"
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Lista de cards — só aparece no modo edição */}
      {isEditing && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Cards do deck
          </p>

          {deckCards.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-4">
              Nenhum card neste deck
            </p>
          ) : (
            <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
              {deckCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="text-sm text-gray-800 line-clamp-1 flex-1">
                    {card.front}
                  </p>

                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => onEditCard(card)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteCard(card.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? "Salvar" : "Adicionar"}
        </button>
      </div>
    </>
  );
};
