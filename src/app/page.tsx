import { InsomniaNavbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { LogoMarquee } from "@/components/sections/logo-marquee";
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
