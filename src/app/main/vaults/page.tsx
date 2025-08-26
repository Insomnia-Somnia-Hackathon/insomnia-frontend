import { Metadata } from 'next';
import SecondaryNav from '../(components)/SecondaryNav';
import VaultsGrid from '../(components)/VaultsGrid';

export const metadata: Metadata = {
  title: 'Vaults - Somnia Airdrop Points Vault',
  description: 'Browse and deposit into high-yield airdrop point vaults on Somnia',
};

export default function VaultsPage() {
  return (
    <>
      <SecondaryNav />
      <VaultsGrid />
    </>
  );
}