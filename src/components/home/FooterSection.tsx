export default function FooterSection() {
  return (
    <footer className="backdrop-blur-xl bg-white/60 border-t border-white/40 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4 space-x-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Q+rate
          </span>
        </div>

        <p className="text-gray-600 mb-2">
          © 2024 Q+rate. All rights reserved.
        </p>

        <a
          href="https://readdy.ai/?origin=logo"
          className="text-violet-600 hover:text-violet-700 transition"
        >
          Powered by Readdy
        </a>
      </div>
    </footer>
  );
}
