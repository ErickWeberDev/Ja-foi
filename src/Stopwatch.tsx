import { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const hasPlayed = useRef(false);
  const bipeRef = useRef<HTMLAudioElement | null>(null);

  const [time, setTime] = useState<number>(() => {
    const saved = localStorage.getItem("time");
    return saved ? Number(saved) : 0;
  });

  const [timePomodoro, setTimePomodoro] = useState(0);

  const [play, setPlay] = useState<boolean>(false);
  const [pomodoro, setPomodoro] = useState<boolean>(false);
  const [ciclo, setCiclo] = useState<boolean>(false);

  useEffect(() => {
    bipeRef.current = new Audio("src/sounds/bepe.mp3");
  }, []);

  useEffect(() => {
    localStorage.setItem("time", String(time));
  }, [time]);

  useEffect(() => {
    let intervalo: number;

    if (play) {
      const startTime = Date.now() - time;

      intervalo = window.setInterval(() => {
        const current = Date.now() - startTime;

        setTime(current);

        if (pomodoro) {
          setTimePomodoro(current);
        }
      }, 10);
    }

    return () => clearInterval(intervalo);
  }, [play]);
  useEffect(() => {
    if (!pomodoro) return;

    const seconds = Math.floor(timePomodoro / 1000);

    if (seconds === 10 && !hasPlayed.current) {
      bipeRef.current?.play();
      hasPlayed.current = true;
    }

    if (seconds === 15) {
      bipeRef.current?.play();

      setTimePomodoro(0);
      hasPlayed.current = false;
    }
  }, [timePomodoro, pomodoro]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-3xl mx-auto space-y-6">
      <section className="space-y-1">
        <h1 className="text-xl font-semibold text-gray-900">Cronômetro</h1>
        <p className="text-sm text-gray-500">Gerencie seu tempo de estudo</p>
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-sm">Ativar cronômetro</span>
        </div>

        <div className="flex gap-0.5 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setPomodoro(!pomodoro)}
            className={
              pomodoro
                ? "flex-1 cursor-pointer py-2 text-sm rounded-md bg-white text-gray-900 shadow-sm"
                : "flex-1 cursor-pointer py-2 text-sm rounded-md bg-gray-200 text-gray-600"
            }
          >
            Pomodoro
          </button>

          <button
            onClick={() => setCiclo(!ciclo)}
            className={
              ciclo
                ? "flex-1 cursor-pointer py-2 text-sm rounded-md bg-white text-gray-900 shadow-sm"
                : "flex-1 cursor-pointer py-2 text-sm rounded-md bg-gray-200 text-gray-600"
            }
          >
            Ciclo
          </button>
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-center space-y-4">
        <div className="text-4xl font-semibold text-gray-900 tracking-tight">
          {formatTime(time)}
        </div>

        <p className="text-sm text-blue-700">Sessão de foco</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setPlay(!play)}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {play ? "Pausar" : "Iniciar"}
          </button>

          <button
            onClick={() => {
              setPlay(false);
              setTime(0);
              setTimePomodoro(0);
              localStorage.setItem("time", "0");
            }}
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Resetar
          </button>
        </div>
      </section>
    </main>
  );
};
