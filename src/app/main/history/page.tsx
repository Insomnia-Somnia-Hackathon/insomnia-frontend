import { Metadata } from 'next';
import SecondaryNav from '../(components)/SecondaryNav';
import { HistoryPage } from './_components';

export const metadata: Metadata = {
  title: 'History - Somnia Airdrop Points Vault',
  description: 'View your transaction history across all vaults',
};

export default function HistoryPageWrapper() {
  return (
    <>
      <SecondaryNav />
      <HistoryPage />
    </>
  );
}