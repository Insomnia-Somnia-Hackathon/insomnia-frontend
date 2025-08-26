export interface Protocol {
  id: string;
  name: string;
  status: 'Active' | 'Queued';
  estPointsApr: number;
  imageUrl: string;
  profileUrl: string;
}

export interface Vault {
  slug: string;
  symbol: string;
  name: string;
  tvlUSD: number;
  estPointsAPR: number;
  risk: 'Low' | 'Moderate' | 'High';
  strategies: string[];
  acceptedAssets: string[];
  rewardsLogos: string[];
  rewardsMultipliers: string[]; // Point multipliers for each reward (e.g., "1x", "2x", "3x")
  description: string;
  withdrawalTime: string;
  imageUrl: string;
}

export interface HistoryItem {
  hash: string;
  timestamp: Date;
  vaultSlug: string;
  action: 'deposit' | 'withdraw' | 'claim';
  amountUSD: number;
}

export interface UserRewardBalance {
  protocolName: string;
  protocolLogo: string;
  points: number;
  multiplier: string;
}

export interface UserVaultRewards {
  vaultSlug: string;
  totalPoints: number;
  rewardBalances: UserRewardBalance[];
}

export const protocols: Protocol[] = [
  {
    id: 'somnia-network',
    name: 'Somnia Network',
    status: 'Active',
    estPointsApr: 15.2,
    imageUrl: '/Images/Logo/somnia_logo.png',
    profileUrl: 'https://testnet.somnia.network/'
  },
  {
    id: 'somnia-games',
    name: 'Somnia Games',
    status: 'Active',
    estPointsApr: 12.8,
    imageUrl: 'https://pbs.twimg.com/profile_images/1922692326268289025/SbPCG67Z_400x400.jpg',
    profileUrl: 'https://x.com/somniaGames_'
  },
  {
    id: 'somnia-eco',
    name: 'Somnia Eco',
    status: 'Active',
    estPointsApr: 18.5,
    imageUrl: 'https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg',
    profileUrl: 'https://x.com/SomniaEco'
  },
  {
    id: 'somnia-meme',
    name: 'Somnia Meme',
    status: 'Queued',
    estPointsApr: 22.1,
    imageUrl: 'https://pbs.twimg.com/profile_images/1909551371646291968/-v1dViT0_400x400.jpg',
    profileUrl: 'https://x.com/somniameme'
  },
  {
    id: 'somnex',
    name: 'SomneX',
    status: 'Active',
    estPointsApr: 14.7,
    imageUrl: 'https://pbs.twimg.com/profile_images/1920467040298483713/B7yqMDE4_400x400.jpg',
    profileUrl: 'https://x.com/SomnexXYZ'
  },
  {
    id: 'potionswap',
    name: 'PotionSwap',
    status: 'Active',
    estPointsApr: 16.3,
    imageUrl: 'https://pbs.twimg.com/profile_images/1919271687188869120/0r7YTdwJ_400x400.jpg',
    profileUrl: 'https://x.com/PotionswapRise'
  }
];

export const vaults: Vault[] = [
  {
    slug: 'som-eth',
    symbol: 'SOM-ETH',
    name: 'SomETH Vault',
    tvlUSD: 2450000,
    estPointsAPR: 24.5,
    risk: 'Moderate',
    strategies: ['Liquidity Mining', 'Yield Farming', 'Cross-Chain Bridge'],
    acceptedAssets: ['ETH', 'WETH', 'stETH'],
    rewardsLogos: [
      '/Images/Logo/somnia_logo.png',
      'https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg'
    ],
    rewardsMultipliers: ['2x', '1.5x'],
    description: 'Maximize ETH rewards across multiple Somnia protocols with automated yield strategies.',
    withdrawalTime: '7 days',
    imageUrl: '/Images/Logo/eth-logo.png'
  },
  { 
    slug: 'som-usd',
    symbol: 'SOM-USD',
    name: 'SomUSD Stable Vault',
    tvlUSD: 1890000,
    estPointsAPR: 18.2,
    risk: 'Low',
    strategies: ['Stable Yield', 'Lending Optimization', 'Arbitrage'],
    acceptedAssets: ['USDC', 'USDT', 'DAI', 'FRAX'],
    rewardsLogos: [
      '/Images/Logo/somnia_logo.png',
      'https://pbs.twimg.com/profile_images/1922692326268289025/SbPCG67Z_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1919271687188869120/0r7YTdwJ_400x400.jpg'
    ],
    rewardsMultipliers: ['1x', '2x', '1.2x'],
    description: 'Stable, consistent returns from USD-denominated assets across the Somnia ecosystem.',
    withdrawalTime: '3 days',
    imageUrl: '/Images/Logo/usdc-logo.png'
  },
  {
    slug: 'som-points',
    symbol: 'SOM-PTS',
    name: 'SomPoints Boost Vault',
    tvlUSD: 3120000,
    estPointsAPR: 32.8,
    risk: 'High',
    strategies: ['Points Maximization', 'Multi-Protocol Farming', 'Boost Stacking'],
    acceptedAssets: ['SOM', 'ETH', 'USDC'],
    rewardsLogos: [
      '/Images/Logo/somnia_logo.png',
      'https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1920467040298483713/B7yqMDE4_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1909551371646291968/-v1dViT0_400x400.jpg'
    ],
    rewardsMultipliers: ['3x', '2x', '1.8x', '2.5x'],
    description: 'Aggressive points accumulation strategy designed for maximum airdrop potential.',
    withdrawalTime: '14 days',
    imageUrl: '/Images/Logo/somnia_logo.png'
  }
];

export const history: HistoryItem[] = [
  {
    hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    vaultSlug: 'som-eth',
    action: 'deposit',
    amountUSD: 5000
  },
  {
    hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef123a',
    timestamp: new Date('2024-01-14T15:45:00Z'),
    vaultSlug: 'som-usd',
    action: 'deposit',
    amountUSD: 2500
  },
  {
    hash: '0x3c4d5e6f7890abcdef1234567890abcdef123a2b',
    timestamp: new Date('2024-01-13T09:20:00Z'),
    vaultSlug: 'som-points',
    action: 'claim',
    amountUSD: 150
  },
  {
    hash: '0x4d5e6f7890abcdef1234567890abcdef123a2b3c',
    timestamp: new Date('2024-01-12T14:15:00Z'),
    vaultSlug: 'som-eth',
    action: 'withdraw',
    amountUSD: 1200
  },
  {
    hash: '0x5e6f7890abcdef1234567890abcdef123a2b3c4d',
    timestamp: new Date('2024-01-11T11:00:00Z'),
    vaultSlug: 'som-usd',
    action: 'deposit',
    amountUSD: 3200
  }
];

// Mock data for user reward balances
export const userVaultRewards: UserVaultRewards[] = [
  {
    vaultSlug: 'som-eth',
    totalPoints: 12450,
    rewardBalances: [
      {
        protocolName: 'Somnia Network',
        protocolLogo: '/Images/Logo/somnia_logo.png',
        points: 8300,
        multiplier: '2x'
      },
      {
        protocolName: 'Somnia Ecosystem',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg',
        points: 4150,
        multiplier: '1.5x'
      }
    ]
  },
  {
    vaultSlug: 'som-usd',
    totalPoints: 8950,
    rewardBalances: [
      {
        protocolName: 'Somnia Network',
        protocolLogo: '/Images/Logo/somnia_logo.png',
        points: 3200,
        multiplier: '1x'
      },
      {
        protocolName: 'Somnia Games',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1922692326268289025/SbPCG67Z_400x400.jpg',
        points: 4100,
        multiplier: '2x'
      },
      {
        protocolName: 'PotionSwap',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1919271687188869120/0r7YTdwJ_400x400.jpg',
        points: 1650,
        multiplier: '1.2x'
      }
    ]
  },
  {
    vaultSlug: 'som-points',
    totalPoints: 18750,
    rewardBalances: [
      {
        protocolName: 'Somnia Network',
        protocolLogo: '/Images/Logo/somnia_logo.png',
        points: 9000,
        multiplier: '3x'
      },
      {
        protocolName: 'Somnia Ecosystem',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg',
        points: 4500,
        multiplier: '2x'
      },
      {
        protocolName: 'Somnex',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1920467040298483713/B7yqMDE4_400x400.jpg',
        points: 3150,
        multiplier: '1.8x'
      },
      {
        protocolName: 'Somnia Meme',
        protocolLogo: 'https://pbs.twimg.com/profile_images/1909551371646291968/-v1dViT0_400x400.jpg',
        points: 2100,
        multiplier: '2.5x'
      }
    ]
  }
];

// Computed stats for Hero KPI
export const getKpiStats = () => {
  const totalTVL = vaults.reduce((sum, vault) => sum + vault.tvlUSD, 0);
  const activeProtocols = protocols.filter(p => p.status === 'Active').length;
  const avgPointsAPR = vaults.reduce((sum, vault) => sum + vault.estPointsAPR, 0) / vaults.length;
  
  return {
    totalTVL,
    activeProtocols,
    avgPointsAPR: Math.round(avgPointsAPR * 10) / 10
  };
};