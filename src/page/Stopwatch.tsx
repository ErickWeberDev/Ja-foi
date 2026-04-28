import { useEffect, useRef, useState } from "react";
import type { materialsType } from "../types/materialsTypes";
import bepeSound from "../sounds/bepe.mp3";

type Mode = "pomodoro" | "ciclo" | null;

const STORAGE = {
  time: "time",
  materials: "materials",
};

const getSavedMaterials = (): materialsType[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE.materials);
    return raw ? (JSON.parse(raw) as materialsType[]) : [];
  } catch {
    return [];
  }
};

const getSavedTime = (): number => {
  if (typeof window === "undefined") return 0;

  const parsed = Number(localStorage.getItem(STORAGE.time));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
};

export const Stopwatch = () => {
  const hasPlayed = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startRef = useRef(0);
  const timeRef = useRef(0);

  const [mode, setMode] = useState<Mode>(null);
  const [play, setPlay] = useState(false);
  const [value, setValue] = useState("");

  const [materials] = useState<materialsType[]>(getSavedMaterials);

  const [time, setTime] = useState<number>(getSavedTime);

  useEffect(() => {
    audioRef.current = new Audio(bepeSound);
    audioRef.current.preload = "auto";
  }, []);

  useEffect(() => {
    timeRef.current = time;
    localStorage.setItem(STORAGE.time, String(time));
  }, [time]);

  useEffect(() => {
    if (!play) return;

    startRef.current = Date.now() - timeRef.current;

    const id = setInterval(() => {
      setTime(Date.now() - startRef.current);
    }, 10);

    return () => clearInterval(id);
  }, [play]);

  useEffect(() => {
    if (mode !== "pomodoro") return;

    const min = Math.floor(time / 60000);
    const cycle = min % 30;

    if (cycle === 25 && !hasPlayed.current) {
      audioRef.current?.play().catch(() => undefined);
      hasPlayed.current = true;
    }

    if (cycle === 0 && min !== 0) {
      hasPlayed.current = false;
    }
  }, [time, mode]);

  const format = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const selectedMaterial =
    materials.find((item) => String(item.id) === value) ?? materials[0];
  const selectedValue = selectedMaterial ? String(selectedMaterial.id) : "";
  const cycleProgress = selectedMaterial
    ? `${selectedMaterial.boxComplet}/${selectedMaterial.box}`
    : "0/0";

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-3xl mx-auto space-y-6">
      <section>
        <h1 className="text-xl font-semibold">Cronômetro</h1>
        <p className="text-sm text-gray-500">Gerencie seu tempo de estudo</p>
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setMode(mode === "pomodoro" ? null : "pomodoro")}
            className={`flex-1 py-2 text-sm rounded-md ${
              mode === "pomodoro" ? "bg-white shadow-sm" : "bg-gray-200"
            }`}
          >
            Pomodoro
          </button>

          <button
            onClick={() => {
              setMode(mode === "ciclo" ? null : "ciclo");
            }}
            className={`flex-1 py-2 text-sm rounded-md ${
              mode === "ciclo" ? "bg-white shadow-sm" : "bg-gray-200"
            }`}
          >
            Ciclo
          </button>
        </div>

        {mode === "ciclo" && (
          <div>
            {materials.length ? (
              <>
                <select
                  value={selectedValue}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                >
                  <option value="">Selecionar</option>
                  {materials.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <div className="mt-1 px-3 py-2">{cycleProgress}</div>
              </>
            ) : (
              <h1>Nenhuma matéria no ciclo</h1>
            )}
          </div>
        )}
      </section>

      <section className="bg-blue-50 border p-6 rounded-xl text-center space-y-4">
        <div className="text-4xl font-semibold">{format(time)}</div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setPlay((p) => !p)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {play ? "Pausar" : "Iniciar"}
          </button>

          <button
            onClick={() => {
              setPlay(false);
              setTime(0);
              hasPlayed.current = false;
              localStorage.setItem(STORAGE.time, "0");
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Resetar
          </button>
        </div>
      </section>
    </main>
  );
};
