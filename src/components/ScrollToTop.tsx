import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 라우팅 변경 시 스크롤을 맨 위로 올리기
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
