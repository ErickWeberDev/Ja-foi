export const Home = () => {
  return (
    <main className="mt-20 md:mt-24 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
      <section className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
        <p className="text-sm text-blue-700">Continue de onde parou</p>
        <h2 className="text-lg font-semibold text-gray-900 mt-1">
          Sessão de estudo
        </h2>
        <p className="text-gray-600 text-sm mt-1">25 minutos concluídos</p>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Continuar
        </button>
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Afazeres</p>
          <a href="afazeres" className="text-sm text-blue-600 hover:underline">
            Ver tudo
          </a>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="text-gray-800 text-sm">Revisar matemática</span>
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="text-gray-800 text-sm">
              Fazer exercícios de física
            </span>
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="text-gray-800 text-sm">
              Ler capítulo de história
            </span>
          </li>
        </ul>
      </section>

      <section className="bg-gray-50 p-5 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Caderno</p>
          <a href="caderno" className="text-sm text-blue-600 hover:underline">
            Ver tudo
          </a>
        </div>

        <ul className="space-y-2">
          <li className="px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <p className="text-gray-800 text-sm font-medium">
              Funções de 2º grau
            </p>
            <p className="text-xs text-gray-500">Matemática</p>
          </li>

          <li className="px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <p className="text-gray-800 text-sm font-medium">Leis de Newton</p>
            <p className="text-xs text-gray-500">Física</p>
          </li>

          <li className="px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <p className="text-gray-800 text-sm font-medium">
              Revolução Francesa
            </p>
            <p className="text-xs text-gray-500">História</p>
          </li>
        </ul>
      </section>
    </main>
  );
};
