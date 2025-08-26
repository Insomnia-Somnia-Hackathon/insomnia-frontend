import { InsomniaNavbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { FarmingActivitySection } from "@/components/sections/farming-activity";
import { TextRevealClosing } from "@/components/sections/text-reveal-closing";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div>
      <InsomniaNavbar />
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      {/* <FarmingActivitySection /> */}
      {/* <TextRevealClosing /> */}
      <Footer />
    </div>
  );
}
