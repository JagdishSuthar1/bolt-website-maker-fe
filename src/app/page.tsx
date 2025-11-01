
import FeatureSection from '@/components/landing-page/FeatureSection';
import Footer from '@/components/landing-page/Footer';
import Header from '@/components/landing-page/Header';
import HeroSection from '@/components/landing-page/HeroSection';
import ParallaxSection from '@/components/landing-page/ParallaxSection';
import ShowcaseSection from '@/components/landing-page/ShowCaseSection';


const LandingPage = () => {


  return (
    <div className="min-h-screen text-foreground bg-black">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <ShowcaseSection />
        <ParallaxSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
