export default function FeaturesSection() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
          왜 Q+rate를 선택해야 할까요?
        </h2>
        <p className="text-xl text-gray-600 mb-16">
          전문적인 설문 조사를 위한 완벽한 솔루션
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "빠른 설문 생성",
              description: "몇 분 만에 전문 설문을 만들 수 있습니다.",
              icon: "ri-flashlight-fill",
            },
            {
              title: "실시간 분석",
              description: "응답 데이터를 즉시 시각화합니다.",
              icon: "ri-line-chart-fill",
            },
            {
              title: "협업 기능",
              description: "팀원들과 설문을 관리하고 공유할 수 있습니다.",
              icon: "ri-team-fill",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-lg border border-white/40 hover:scale-105 transition"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-violet-500 text-white text-3xl">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
