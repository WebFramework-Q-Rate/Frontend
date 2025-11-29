import { useMemo } from "react";
import Cloud from "react-d3-cloud";
import { generateWordCloud } from "../../utils/generateWordCloud";
import { getSentimentAnalysis } from "../../utils/calculateSentiment";

interface TextAnalysisProps {
  textResponses: string[];
}

// 주관식 컴포넌트 - 워드클라우드, 감정 분석, 최근 응답
export function WordCloud({ textResponses }: TextAnalysisProps) {
  const wordCloudData = generateWordCloud(textResponses);

  const data = useMemo(() => {
    return wordCloudData.map((item) => ({
      text: item.word,
      value: item.count || 1,
    }));
  }, [wordCloudData]);

  const maxCount = Math.max(...wordCloudData.map((w) => w.count), 1);
  const ratio = (value: number) => value / maxCount;

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-cloud-line mr-2"></i>
        워드클라우드
      </h3>

      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="WORD_GRADIENT"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="w-full" style={{ height: "320px" }}>
        {data.length > 0 ? (
          <Cloud
            data={data}
            width={520}
            height={300}
            font="Arial"
            spiral="archimedean"
            rotate={() => 0}
            padding={2}
            fontWeight="bold"
            fontSize={(d: any) => {
              const r = Math.pow(ratio(d.value), 2);
              return 6 + r * 66; // 6px ~ 72px
            }}
            fill={() => "url(#WORD_GRADIENT)"}
          />
        ) : (
          <div className="text-center text-gray-500">
            <p>분석할 텍스트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SentimentAnalysis({ textResponses }: TextAnalysisProps) {
  const sentiment = getSentimentAnalysis(textResponses);
  const total = sentiment.positive + sentiment.negative + sentiment.neutral;

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-emotion-line mr-2"></i>
        감정 분석
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">긍정적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.positive}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.positive / total) * 100) : 0}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
            <span className="text-gray-700">중립적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.neutral}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.neutral / total) * 100) : 0}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <span className="text-gray-700">부정적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.negative}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.negative / total) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecentResponsesProps {
  textResponses: string[];
}

export function RecentResponses({ textResponses }: RecentResponsesProps) {
  return (
    <div className="lg:col-span-2 bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-chat-3-line mr-2"></i>
        최근 응답 ({textResponses.length}개)
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {textResponses.slice(0, 5).map((response, idx) => (
          <div
            key={idx}
            className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50"
          >
            <p className="text-gray-700">{response}</p>
          </div>
        ))}
        {textResponses.length > 5 && (
          <div className="text-center text-sm text-gray-600 pt-2">
            +{textResponses.length - 5}개 응답 더 있음
          </div>
        )}
      </div>
    </div>
  );
}
