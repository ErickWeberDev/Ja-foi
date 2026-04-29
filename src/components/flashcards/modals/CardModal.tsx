type Props = {
  cardFront: string;
  cardVerse: string;
  isEditing: boolean;
  onChangeFront: (value: string) => void;
  onChangeVerse: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export const CardModal = ({
  cardFront,
  cardVerse,
  isEditing,
  onChangeFront,
  onChangeVerse,
  onSave,
  onCancel,
}: Props) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Editar Card" : "Criar Card"}
        </h2>
        <p className="text-sm text-gray-500">Crie uma pergunta e resposta</p>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Pergunta</label>
        <textarea
          value={cardFront}
          onChange={(e) => onChangeFront(e.target.value)}
          className="w-full min-h-[80px] p-3 text-sm border border-gray-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Resposta</label>
        <textarea
          value={cardVerse}
          onChange={(e) => onChangeVerse(e.target.value)}
          className="w-full min-h-[80px] p-3 text-sm border border-gray-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

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
