import { Metadata } from 'next';
import SecondaryNav from '../(components)/SecondaryNav';
import HistoryTable from '../(components)/HistoryTable';

export const metadata: Metadata = {
  title: 'History - Somnia Airdrop Points Vault',
  description: 'View your transaction history across all vaults',
};

export default function HistoryPage() {
  return (
    <>
      <SecondaryNav />
      <HistoryTable />
    </>
  );
}