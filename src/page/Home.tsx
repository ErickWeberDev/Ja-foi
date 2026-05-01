import { useMemo } from "react";
import type { choresType } from "../types/choresTypes";
import type { Notebook } from "../types/NotebookTypes";

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  if (h > 0) return `${h}h ${m}min acumulados`;
  if (m > 0) return `${m} minutos acumulados`;
  return "Nenhum tempo registrado";
};

export const Home = () => {
  const chores = useMemo(() => readStorage<choresType[]>("chores", []), []);
  const notebooks = useMemo(() => readStorage<Notebook[]>("journal", []), []);
  const timeMs = useMemo(() => readStorage<number>("time", 0), []);

  const pendingChores = chores.filter((c) => !c.box).slice(0, 3);
  const recentNotebooks = [...notebooks].reverse().slice(0, 3);

  return (
    <main className="mb-20 mt-20 md:mt-24 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
      <section className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
        <p className="text-sm text-blue-700">Tempo de estudo</p>
        <h2 className="text-lg font-semibold text-gray-900 mt-1">Cronômetro</h2>
        <p className="text-gray-600 text-sm mt-1">{formatTime(timeMs)}</p>

        <a
          href="stopwatch"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Abrir cronômetro
        </a>
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Afazeres</p>
          <a href="chores" className="text-sm text-blue-600 hover:underline">
            Ver tudo
          </a>
        </div>

        {pendingChores.length ? (
          <ul className="space-y-2">
            {pendingChores.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <input
                  type="checkbox"
                  readOnly
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-800 text-sm">{item.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhum afazer pendente
          </p>
        )}
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Caderno</p>
          <a href="journal" className="text-sm text-blue-600 hover:underline">
            Ver tudo
          </a>
        </div>

        {recentNotebooks.length ? (
          <ul className="space-y-2">
            {recentNotebooks.map((note) => (
              <li
                key={note.id}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                <p className="text-gray-800 text-sm font-medium">
                  {note.title}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {note.content || "Sem conteúdo"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhum caderno criado ainda
          </p>
        )}
      </section>
    </main>
  );
};
