import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VaultDetails } from './_components';
import { vaults } from '../../../(lib)/mockData';

interface VaultPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: VaultPageProps): Promise<Metadata> {
  const vault = vaults.find(v => v.slug === params.slug);
  
  if (!vault) {
    return {
      title: 'Vault Not Found',
    };
  }

  return {
    title: `${vault.name} - Somnia Airdrop Points Vault`,
    description: vault.description,
  };
}

export async function generateStaticParams() {
  return vaults.map((vault) => ({
    slug: vault.slug,
  }));
}

export default function VaultPage({ params }: VaultPageProps) {
  const vault = vaults.find(v => v.slug === params.slug);

  if (!vault) {
    notFound();
  }

  return <VaultDetails vault={vault} />;
}