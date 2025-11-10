import { GlobalImpactSection } from "./sections/GlobalImpactSection";
import { HeroSection } from "./sections/HeroSection";
import { RioCallToActionSection } from "./sections/RioCallToActionSection";
import { TimelineSection } from "./sections/TimelineSection";
import { SocialWallSection } from "./sections/SocialWallSection";

export const HomePage = () => {
  return (
    <div className="space-y-24">
      <HeroSection />
      <GlobalImpactSection />
      <TimelineSection />
      <SocialWallSection />
      <RioCallToActionSection />
    </div>
  );
};

