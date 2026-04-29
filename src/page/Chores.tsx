import { useEffect, useState } from "react";
import type { choresType } from "../types/choresTypes";

export const Chores = () => {
  const [chores, setChores] = useState<choresType[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("chores");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [titleInput, setTitleInput] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    setChores(chores.filter((chores) => chores.id !== id));
  };

  const handleToggle = (id: number) => {
    setChores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, box: !item.box } : item)),
    );
  };
  const handleAdd = () => {
    if (!titleInput.trim()) {
      return chores;
    }
    setIsModal(false);

    setChores([
      ...chores,
      {
        title: titleInput,
        box: false,
        id: chores.length,
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("chores", JSON.stringify(chores));
  }, [chores]);

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-3xl mx-auto space-y-6">
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Afazeres</h2>

        <button
          onClick={() => setIsModal(true)}
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Criar
        </button>
      </section>

      <section className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        {chores.length ? (
          <ul className="space-y-2">
            {chores.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(item.id)}
                    checked={item.box}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />

                  <p className="text-sm text-gray-800">{item.title}</p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="size-8 rounded-md text-red-200 hover:text-red-500 hover:bg-red-50 transition"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-sm text-gray-500">
            Nenhum afazer ainda
          </div>
        )}
      </section>

      {isModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-5 space-y-4 relative">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Novo afazer
              </h2>
              <p className="text-sm text-gray-500">
                Adicione uma tarefa à sua lista
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Título</label>
              <input
                type="text"
                value={titleInput}
                onChange={(i) => setTitleInput(i.target.value)}
                placeholder="Ex: Estudar matemática"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModal(false)}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Adicionar
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
