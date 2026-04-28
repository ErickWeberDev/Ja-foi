import { useEffect, useReducer, useState, useMemo } from "react";
import type { Notebook } from "../types/NotebookTypes";
import { journalReducer } from "../reducer/journalReducer";

export const Journal = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [state, dispatch] = useReducer(
    journalReducer,
    { notebooks: [] },
    (initial) => {
      if (typeof window === "undefined") return initial;
      try {
        const saved = localStorage.getItem("journal");
        return saved ? { notebooks: JSON.parse(saved) } : initial;
      } catch {
        return initial;
      }
    },
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const filteredNotebooks = useMemo(() => {
    const seen = new Set();
    const searchNormalized = normalizeText(search);

    return state.notebooks
      .filter((note: Notebook) => {
        const titleNormalized = normalizeText(note.title);
        if (!searchNormalized) return true;
        return titleNormalized.startsWith(searchNormalized);
      })
      .filter((note: Notebook) => {
        const titleNormalized = normalizeText(note.title);
        if (seen.has(titleNormalized)) return false;
        seen.add(titleNormalized);
        return true;
      });
  }, [state.notebooks, search]);

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(state.notebooks));
  }, [state.notebooks]);

  const handleOpen = (note: Notebook) => {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setIsModal(true);
  };

  const handleNew = () => {
    setSelectedId(null);
    setTitle("");
    setContent("");
    setIsModal(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (selectedId) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: selectedId,
          title,
          content,
        },
      });
    } else {
      dispatch({
        type: "ADD",
        payload: {
          id: Date.now(),
          title,
          content,
        },
      });
    }

    setIsModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
      {isModal ? (
        <section className="fixed inset-0 z-50 bg-white flex flex-col p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do caderno"
              className="text-lg font-semibold w-full outline-none"
            />

            <button
              onClick={() => setIsModal(false)}
              className="ml-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comece a escrever..."
            className="flex-1 w-full p-4 border border-gray-200 rounded-lg outline-none resize-none text-sm"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsModal(false)}
              className="px-4 py-2 bg-gray-100 rounded-md"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Salvar
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Cadernos</h2>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleNew}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Adicionar
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {state.notebooks.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                Nenhum caderno criado ainda.
              </div>
            ) : (
              filteredNotebooks.map((note: Notebook) => (
                <div key={note.id} className="relative">
                  <button
                    onClick={() => handleOpen(note)}
                    className="w-full flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50"
                  >
                    <div className="text-2xl">📝</div>
                    <span className="text-sm text-gray-800">{note.title}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="absolute top-1 right-2 text-2xl text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
};