import { useState } from "react";

export const Header = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Ja <strong className="text-blue-400">Foi</strong>
        </h1>

        <nav className=" hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-700 hover:text-blue-600 transition">
            Início
          </a>
          <a
            href="caderno"
            className="text-gray-700 h-full hover:text-blue-600 transition"
          >
            Caderno
          </a>
          <a
            href="afazeres"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Afazeres
          </a>
          <a
            href="stopwatch"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Cronômetro
          </a>
        </nav>

        <button
          onClick={() => setMenu(!menu)}
          className="p-2 rounded-lg hover:bg-blue-50 transition "
        >
          {menu ? (
            <div className="w-6 h-6 font-bold opacity-70">X</div>
          ) : (
            <img
              src="src/assets/list.svg"
              alt="Abrir menu"
              className="w-6 h-6 opacity-70"
            />
          )}
        </button>
      </header>

      {menu && (
        <section className="fixed w-full right-0 bg-white border-b border-gray-200 shadow-sm  md:w-50">
          <nav className="flex flex-col px-6 py-4 gap-3">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Início
            </a>
            <a
              href="caderno"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Caderno
            </a>
            <a
              href="afazeres"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Afazeres
            </a>
            <a
              href="stopwatch"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Cronômetro
            </a>
            <a
              href="ciclo-de-estudo"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Ciclo de estudo
            </a>
            <a
              href="flash-cards"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Flash cards
            </a>

            <a
              href="configuracao"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Configuração
            </a>
          </nav>
        </section>
      )}
    </>
  );
};
