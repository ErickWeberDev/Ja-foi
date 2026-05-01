export const Settings = () => {
  const handleExport = () => {
    const data: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        data[key] = JSON.parse(localStorage.getItem(key) ?? "");
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        window.location.reload();
      } catch {
        alert("Arquivo inválido. Use um JSON exportado por este app.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="mt-10 md:mt-14 px-4 md:px-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Configurações</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Dados
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExport}
            className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Exportar dados
          </button>
          <label className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center cursor-pointer">
            Importar dados
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </section>
    </main>
  );
};
