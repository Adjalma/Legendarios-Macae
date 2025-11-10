import { GlobalImpactSection } from "./sections/GlobalImpactSection";
import { HeroSection } from "./sections/HeroSection";
import { RioCallToActionSection } from "./sections/RioCallToActionSection";

export const HomePage = () => {
  return (
    <div className="space-y-24">
      <HeroSection />
      <GlobalImpactSection />
      <RioCallToActionSection />
    </div>
  );
};

