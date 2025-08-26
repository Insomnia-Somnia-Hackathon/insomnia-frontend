import Hero from './(components)/Hero';
import ProtocolTicker from './(components)/ProtocolTicker';
import VaultTeaser from './(components)/VaultTeaser';
import HowItWorks from './(components)/HowItWorks';
import Differentiators from './(components)/Differentiators';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProtocolTicker />
      <VaultTeaser />
      <HowItWorks />
      <Differentiators />
    </>
  );
}