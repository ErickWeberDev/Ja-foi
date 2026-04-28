import { useEffect, useState } from "react";
import type { materialsType } from "../types/materialsTypes";

export const StudyCycle = () => {
  const [materials, setMaterials] = useState<materialsType[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("materials");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isModal, setIsModal] = useState<boolean>(false);

  const totalBox = materials.reduce((acc, item) => acc + item.box, 0);
  const totalCompleted = materials.reduce(
    (acc, item) => acc + item.boxComplet,
    0,
  );
  const progress = totalBox > 0 ? (totalCompleted / totalBox) * 100 : 0;
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [horas, setHoras] = useState<number>(0);
  const colorMap: Record<string, string> = {
    blue: "bg-blue-400",
    red: "bg-red-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    orange: "bg-orange-400",
    teal: "bg-teal-400",
    indigo: "bg-indigo-400",
    gray: "bg-gray-400",
  };

  const handleAddmaterial = () => {
    setIsModal(true);
  };

  const handleReset = () => {
    if (totalCompleted >= totalBox) {
      setMaterials((prev) =>
        prev.map((item) => ({
          ...item,
          boxComplet: 0,
        })),
      );
    } else {
      return;
    }
  };

  const handleUpdate = (name: string, color: string, horas: number) => {
    if (name.trim() === "" || horas < 1 || color === "") {
      return;
    }
    setMaterials([
      ...materials,
      {
        color: color,
        name: name,
        box: Number(horas),
        id: materials.length,
        boxComplet: 0,
      },
    ]);

    setName("");
    setColor("");
    setHoras(0);
    setIsModal(false);
  };

  useEffect(() => {
    localStorage.setItem("materials", JSON.stringify(materials));
  }, [materials]);

  return (
    <main className="mt-10 mb-20 md:mt-14 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            📚
          </div>
          <div>
            <p className="text-xs text-gray-500">Matérias</p>
            <p className="text-sm font-semibold text-gray-900">
              {materials.length}
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            ✔️
          </div>
          <div>
            <p className="text-xs text-gray-500">Blocos</p>
            <p className="text-sm font-semibold text-gray-900">
              {totalCompleted} / {totalBox}
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex flex-col gap-1 w-24">
          <p className="text-xs text-gray-500">Progresso</p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-900">Seu ciclo atual</p>
            <p className="text-xs text-gray-500">
              Cada bloco representa 1 hora de estudo
            </p>
          </div>

          <div className="flex items-center gap-1">
            {totalCompleted >= totalBox && totalBox !== 0 ? (
              <button
                onClick={handleReset}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition cursor-pointer"
              >
                Resetar Ciclo
              </button>
            ) : (
              <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md transition cursor-default">
                Resetar Ciclo
              </div>
            )}

            <button
              onClick={handleAddmaterial}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              + Adicionar matéria
            </button>
          </div>
        </div>

        {materials.length ? (
          materials.map((item) => (
            <div key={item.id} className="divide-y divide-gray-200">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center  ${
                      colorMap[item.color] || "bg-gray-200"
                    }`}
                  ></div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}

                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {Array.from({ length: item.boxComplet }).map(
                            (_, i) => (
                              <div
                                key={`done-${i}`}
                                className="w-4 h-4 rounded-md bg-blue-600"
                              />
                            ),
                          )}

                          {Array.from({
                            length: item.box - item.boxComplet,
                          }).map((_, i) => (
                            <div
                              key={`pending-${i}`}
                              className="w-4 h-4 rounded-md bg-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                    </p>
                    <p className="text-xs text-gray-500">5 horas</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {item.boxComplet >= item.box ? (
                    <div className=" cursor-default p-2 font-bold rounded flex items-center justify-center text-gray-500 transition">
                      Adicionar
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMaterials((prev) =>
                          prev.map((m) =>
                            m.id === item.id
                              ? { ...m, boxComplet: m.boxComplet + 1 }
                              : m,
                          ),
                        );
                      }}
                      className=" cursor-pointer p-2 font-bold rounded flex items-center justify-center hover:bg-blue-50 text-center  text-blue-500 transition"
                    >
                      Adicionar
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMaterials((prev) =>
                        prev.filter((i) => item.id !== i.id),
                      );
                    }}
                    className=" cursor-pointer p-2 font-bold rounded flex items-center justify-center hover:bg-red-50 text-center size-9 text-red-500 transition"
                  >
                    <p>X</p>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-3 ">
            <h1 className="text-3xl">nada ainda</h1>
          </div>
        )}
      </section>
      {isModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-5 relative space-y-4">
            <button
              onClick={() => {
                setName("");
                setColor("");
                setHoras(0);
                setIsModal(false);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              ✕
            </button>

            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Nova matéria
              </h1>
              <p className="text-sm text-gray-500">
                Adicione uma matéria ao seu ciclo
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Nome da matéria</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Matemática"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">
                Quantidade de horas
              </label>
              <input
                type="number"
                min="1"
                value={horas}
                onChange={(e) => setHoras(Number(e.target.value))}
                placeholder="Ex: 5"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="space-y-1">
              <div className="flex gap-4 items-center">
                <label className="text-xs text-gray-500">Cor</label>
                <div
                  className={`w-3 h-3 rounded-md border ${
                    colorMap[color] || "bg-gray-200"
                  }`}
                />
              </div>

              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Selecionar</option>
                <option value="blue">Azul</option>
                <option value="red">Vermelho</option>
                <option value="green">Verde</option>
                <option value="yellow">Amarelo</option>
                <option value="purple">Roxo</option>
                <option value="pink">Rosa</option>
                <option value="orange">Laranja</option>
                <option value="teal">Verde-azulado</option>
                <option value="indigo">Índigo</option>
                <option value="gray">Cinza</option>
              </select>
            </div>

            <button
              onClick={() => handleUpdate(name, color, horas)}
              className="w-full mt-2 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Adicionar
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
