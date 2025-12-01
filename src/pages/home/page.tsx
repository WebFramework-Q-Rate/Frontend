import Header from "../../components/feature/Header";
import HeroSection from "../../components/home/HeroSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import FooterSection from "../../components/home/FooterSection";

// 메인 페이지
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
