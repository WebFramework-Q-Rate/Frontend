import { Link } from "react-router-dom";
import type { Survey } from "../../pages/home/page";

interface Props {
  surveys: Survey[];
}

export default function RecentSurveys({ surveys }: Props) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            최근 생성된 설문
          </h2>

          <Link
            to="/create"
            className="px-6 py-3 text-white font-medium rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
          >
            새 설문 만들기
          </Link>
        </div>

        {surveys.length === 0 ? (
          <div className="text-center bg-white/60 p-16 rounded-3xl shadow-lg backdrop-blur-xl border border-white/40">
            <h3 className="text-2xl font-semibold mb-3">설문이 없습니다</h3>
            <p className="text-gray-600 mb-6">첫 설문을 만들어보세요!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {survey.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  생성일: {survey.createdAt}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  응답 수: {survey.responseCount}명
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/survey/${survey.id}`}
                    className="flex-1 px-4 py-2 text-gray-700 bg-white border border-white/40 rounded-lg text-sm text-center"
                  >
                    응답하기
                  </Link>

                  <Link
                    to={`/results/${survey.id}`}
                    className="flex-1 px-4 py-2 text-white rounded-lg text-sm text-center bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  >
                    결과보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
