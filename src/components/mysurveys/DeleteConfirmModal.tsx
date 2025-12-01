interface DeleteConfirmModalProps {
  isOpen: boolean; // 모달 열림 여부
  surveyTitle: string; // 삭제 대상 설문 제목
  onConfirm: () => void; // 삭제 확정 시 실행되는 콜백
  onClose: () => void; // 모달 닫기 콜백
}

// 설문 삭제 확인 모달 컴포넌트
export default function DeleteConfirmModal({
  isOpen,
  surveyTitle,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  // 모달이 닫힌 상태라면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/80 to-violet-600/80 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">설문을 삭제할까요?</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            {surveyTitle && (
              <p className="text-white/90 text-sm">"{surveyTitle}"</p>
            )}
          </div>
          <div className="p-6 space-y-6 text-center">
            <p className="text-gray-700 font-medium">
              삭제된 설문은 복구할 수 없습니다.
            </p>
            <p className="text-gray-500 text-sm">정말로 삭제하시겠습니까?</p>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-all duration-300"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
