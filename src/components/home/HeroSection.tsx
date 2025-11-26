import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
            데이터 기반 의사결정을 위한
          </span>
          <br />
          <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
            스마트 설문 플랫폼
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Q+rate로 설문을 생성하고 실시간 인사이트를 얻으세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/create"
            className="relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <span className="relative z-10">무료로 시작하기</span>
          </Link>

          <Link
            to="/templates"
            className="px-8 py-4 border border-white/40 bg-white/60 backdrop-blur-xl rounded-2xl font-semibold text-violet-600 hover:bg-white/80 transition"
          >
            템플릿 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
