import HeroSection from "./heroSection";
import FeaturesSection from "./featuresSection";
import HowItWorksSection from "./howItWorksSection";
import Footer from "../../components/footer";
import MobileAppBanner from "./mobileAppBanner";
import Navbar from "../../components/navBar/navbar";

const LandingPage: React.FC<{}> = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          overflowY: "auto",
          maxHeight:
            "calc(env(safe-area-inset-top) + 100vh - env(safe-area-inset-bottom))",
        }}
      >
        <Navbar />
        {/* Hero section */}
        <HeroSection />
        {/* Features section */}
        <FeaturesSection />
        {/* How it works Section */}
        <HowItWorksSection />
        <MobileAppBanner />
        <Footer />
      </div>
    </>
  );
};
export default LandingPage;
