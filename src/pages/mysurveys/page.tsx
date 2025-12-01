import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import FooterSection from "../../components/home/FooterSection";
import PageHeader from "../../components/feature/PageHeader";

interface StoredSurvey {
  id: string;
  title: string;
  createdAt?: string;
  creatorId?: string;
  responseCount?: number;
  questions?: Array<unknown>;
}

// 내가 만든 설문 페이지
export default function MySurveysPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<StoredSurvey[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자 정보 및 설문 목록 로드
  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    const storedUserId = localStorage.getItem("userId");
    let resolvedUserId = storedUserId ?? null;
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    // 사용자 정보가 있으면 파싱하여 상태에 저장
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserName(parsed.name ?? null);
        setUserEmail(parsed.email ?? null);
        resolvedUserId = parsed.userId || resolvedUserId;
      } catch (err) {
        console.error("사용자 정보 파싱 오류:", err);
      }
    }

    setUserId(resolvedUserId);

    // 설문 목록 로드
    const savedSurveys = localStorage.getItem("surveys");
    if (savedSurveys) {
      try {
        setSurveys(JSON.parse(savedSurveys));
      } catch (err) {
        console.error("설문 목록 파싱 오류:", err);
      }
    }
  }, []);

  // 내가 만든 설문 필터링
  const mySurveys = useMemo(() => {
    if (!isLoggedIn) return [];
    if (!userId && !userEmail) return [];
    return surveys.filter(
      (survey) =>
        (userId && survey.creatorId === userId) ||
        (userEmail && survey.creatorId === userEmail)
    );
  }, [surveys, userId, userEmail, isLoggedIn]);

  const renderEmptyState = () => {
    if (!isLoggedIn) {
      return (
        <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-12 text-center border border-white/40 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            로그인 후 이용 가능합니다
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            내가 만든 설문을 확인하려면 먼저 로그인해주세요.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
            >
              <span className="relative z-10">로그인 하러가기</span>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-12 text-center border border-white/40 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          아직 생성한 설문이 없어요
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          첫 번째 설문을 만들어보세요!
        </p>
        <Link
          to="/create"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
        >
          <i className="ri-add-line mr-2 relative z-10"></i>
          <span className="relative z-10">새 설문 만들기</span>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="내가 만든 설문"
          description={
            isLoggedIn
              ? `${userName ?? "사용자"}님이 생성한 설문 목록입니다.`
              : "로그인 후 내가 만든 설문을 확인할 수 있습니다."
          }
          actions={
            isLoggedIn ? (
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i className="ri-add-line mr-2 text-lg relative z-10"></i>
                <span className="relative z-10">새 설문 만들기</span>
              </Link>
            ) : undefined
          }
        />

        <div className="max-w-6xl mx-auto mt-6">
          {mySurveys.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {mySurveys.map((survey) => {
                const createdAt = survey.createdAt ?? "생성일 미정";
                const responseCount = survey.responseCount ?? 0;
                const questionCount = Array.isArray(survey.questions)
                  ? survey.questions.length
                  : 0;

                return (
                  <div
                    key={survey.id}
                    className="relative backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            생성일 {createdAt}
                          </p>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                            {survey.title}
                          </h3>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-white/70 border border-white/60 text-gray-700">
                          {questionCount}문항
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        현재 {responseCount}명이 응답했습니다
                      </p>

                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Link
                          to={`/survey/${survey.id}`}
                          className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white transition text-center font-medium text-gray-700"
                        >
                          설문 열기
                        </Link>
                        <Link
                          to={`/results/${survey.id}`}
                          className="relative inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-xl overflow-hidden group shadow-md hover:shadow-lg"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                          <span className="relative z-10">결과 보기</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
