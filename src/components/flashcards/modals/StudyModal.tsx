import type { CardsType, DeckType } from "../../../types/CardsType";

type Props = {
  selectedDeck: DeckType | undefined;
  studyCards: CardsType[];
  studyIndex: number;
  showAnswer: boolean;
  selectedDifficulty: number | null;
  onShowAnswer: () => void;
  onSelectDifficulty: (n: number) => void;
  onNext: () => void;
  onRestart: () => void;
  onCancel: () => void; 
};

export const StudyModal = ({
  selectedDeck,
  studyCards,
  studyIndex,
  showAnswer,
  selectedDifficulty,
  onShowAnswer,
  onSelectDifficulty,
  onNext,
  onRestart,
  onCancel,
}: Props) => {
  const currentCard = studyCards[studyIndex];

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedDeck?.title}
        </h2>
        <span className="text-xs text-gray-400">
          {Math.min(studyIndex + 1, studyCards.length)} / {studyCards.length}
        </span>
      </div>

      {studyCards.length === 0 ? (
        <div className="text-center py-10 text-sm text-gray-400">
          Nenhum card neste deck
        </div>
      ) : studyIndex >= studyCards.length ? (
        <div className="text-center py-10 space-y-3">
          <p className="text-2xl">🎉</p>
          <p className="text-sm font-medium text-gray-700">Deck concluído!</p>
          <button
            onClick={onRestart}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Reiniciar
          </button>
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50 min-h-[140px]">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Pergunta
            </p>
            <p className="text-sm text-gray-800 font-medium">
              {currentCard.front}
            </p>

            {showAnswer && (
              <div className="pt-3 border-t border-gray-200 space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Resposta
                </p>
                <p className="text-sm text-gray-700">{currentCard.verse}</p>
              </div>
            )}
          </div>

          {!showAnswer && (
            <button
              onClick={onShowAnswer}
              className="w-full py-2 text-sm border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Ver resposta
            </button>
          )}

          {showAnswer && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">
                Qual o nível de dificuldade de lembrar?
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => onSelectDifficulty(n)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold border transition ${
                      selectedDifficulty === n
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-center text-gray-400">
                1 = muito difícil · 5 = muito fácil
              </p>
            </div>
          )}

          {showAnswer && (
            <button
              onClick={onNext}
              disabled={selectedDifficulty === null}
              className="w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          )}
        </>
      )}

      
      <button
        onClick={onCancel}
        className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
      >
        Cancelar
      </button>
    </>
  );
};
