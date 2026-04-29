export const Footer = () => {
  return (
    <footer className=" fixed mt-3 bottom-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs text-gray-500">
        <a className="whitespace-nowrap">Feito por Erick Weber ©</a>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/erick-weber-dev/"
            target="_blank"
            className="hover:text-blue-600 transition"
          >
            LinkedIn
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://github.com/ErickWeberDev"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
