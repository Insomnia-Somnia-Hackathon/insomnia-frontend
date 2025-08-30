export interface Protocol {
  id: string;
  name: string;
  status: "Active" | "Queued";
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
  risk: "Low" | "Moderate" | "High";
  strategies: string[];
  acceptedAssets: string[];
  rewardsLogos: string[];
  rewardsMultipliers: string[];
  description: string;
  withdrawalTime: string;
  imageUrl: string;
  address: `0x${string}`;
  rewardsNames?: string[];
}

export interface HistoryItem {
  hash: string;
  timestamp: Date;
  vaultSlug: string;
  action: "deposit" | "withdraw" | "claim";
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

export const protocols: Protocol[] = [];

export const vaults: Vault[] = [
  {
    slug: "som-eth",
    symbol: "SOM-ETH",
    name: "SomETH Vault",
    tvlUSD: 2450000,
    estPointsAPR: 12.5,
    risk: "Moderate",
    strategies: ["Liquidity Mining", "Yield Farming", "Cross-Chain Bridge"],
    acceptedAssets: ["STT"],
    rewardsLogos: [
      "/Images/Logo/somnia_logo.png",
      "https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg",
    ],
    rewardsMultipliers: ["2x", "1.5x"],
    description:
      "Maximize Somnia rewards in SomETH vaults across multiple Somnia protocols with automated yield strategies.",
    withdrawalTime: "7 days",
    imageUrl: "/Images/Logo/eth-logo.png",
    address: "0x0fBCa75D8cD14dCf3AF4A45DCBF223aA1E7910F7",
  },
  {
    slug: "som-points",
    symbol: "SOM-USD",
    name: "SomUSD Stable Vault",
    tvlUSD: 1890000,
    estPointsAPR: 9.2,
    risk: "Low",
    strategies: ["Stable Yield", "Lending Optimization", "Arbitrage"],
    acceptedAssets: ["STT"],
    rewardsLogos: [
      "/Images/Logo/somnia_logo.png",
      "https://pbs.twimg.com/profile_images/1922692326268289025/SbPCG67Z_400x400.jpg",
      "https://pbs.twimg.com/profile_images/1919271687188869120/0r7YTdwJ_400x400.jpg",
    ],
    rewardsMultipliers: ["1x", "2x", "1.2x"],
    description:
      "Stable Vaults, consistent returns from USD-denominated assets across the Somnia ecosystem.",
    withdrawalTime: "3 days",
    imageUrl: "/Images/Logo/somnia_logo.png",
    address: "0x6261514Ee799666265c8c371bf21d0B0F6D85E76",
  },
  {
    slug: "som-usd",
    symbol: "SOM-PTS",
    name: "SomPoints Boost Vault",
    tvlUSD: 3120000,
    estPointsAPR: 15.8,
    risk: "High",
    strategies: [
      "Points Maximization",
      "Multi-Protocol Farming",
      "Boost Stacking",
    ],
    acceptedAssets: ["STT"],
    rewardsLogos: [
      "/Images/Logo/somnia_logo.png",
      "https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg",
      "https://pbs.twimg.com/profile_images/1920467040298483713/B7yqMDE4_400x400.jpg",
      "https://pbs.twimg.com/profile_images/1909551371646291968/-v1dViT0_400x400.jpg",
    ],
    rewardsMultipliers: ["3x", "2x", "1.8x", "2.5x"],
    description:
      "Aggressive points accumulation strategy designed for maximum airdrop potential.",
    withdrawalTime: "14 days",
    imageUrl: "/Images/Logo/usdc-logo.png",
    address: "0xD1edDafEb54071Bc78894B554Ad4bc66FA072678",
  },
];

export const history: HistoryItem[] = [
  {
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    vaultSlug: "som-eth",
    action: "deposit",
    amountUSD: 5000,
  },
  {
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef123a",
    timestamp: new Date("2024-01-14T15:45:00Z"),
    vaultSlug: "som-usd",
    action: "deposit",
    amountUSD: 2500,
  },
  {
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef123a2b",
    timestamp: new Date("2024-01-13T09:20:00Z"),
    vaultSlug: "som-points",
    action: "claim",
    amountUSD: 150,
  },
  {
    hash: "0x4d5e6f7890abcdef1234567890abcdef123a2b3c",
    timestamp: new Date("2024-01-12T14:15:00Z"),
    vaultSlug: "som-eth",
    action: "withdraw",
    amountUSD: 1200,
  },
  {
    hash: "0x5e6f7890abcdef1234567890abcdef123a2b3c4d",
    timestamp: new Date("2024-01-11T11:00:00Z"),
    vaultSlug: "som-usd",
    action: "deposit",
    amountUSD: 3200,
  },
];

export const userVaultRewards: UserVaultRewards[] = [
  {
    vaultSlug: "som-eth",
    totalPoints: 0,
    rewardBalances: [
      {
        protocolName: "Somnia Network",
        protocolLogo: "/Images/Logo/somnia_logo.png",
        points: 0,
        multiplier: "2x",
      },
      {
        protocolName: "Somnia Ecosystem",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg",
        points: 0,
        multiplier: "1.5x",
      },
    ],
  },
  {
    vaultSlug: "som-points",
    totalPoints: 0,
    rewardBalances: [
      {
        protocolName: "Somnia Network",
        protocolLogo: "/Images/Logo/somnia_logo.png",
        points: 0,
        multiplier: "1x",
      },
      {
        protocolName: "Somnia Games",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1922692326268289025/SbPCG67Z_400x400.jpg",
        points: 0,
        multiplier: "2x",
      },
      {
        protocolName: "PotionSwap",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1919271687188869120/0r7YTdwJ_400x400.jpg",
        points: 0,
        multiplier: "1.2x",
      },
    ],
  },
  {
    vaultSlug: "som-usd",
    totalPoints: 0,
    rewardBalances: [
      {
        protocolName: "Somnia Network",
        protocolLogo: "/Images/Logo/somnia_logo.png",
        points: 0,
        multiplier: "3x",
      },
      {
        protocolName: "Somnia Ecosystem",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1920358416645488640/2I1J4VmX_400x400.jpg",
        points: 0,
        multiplier: "2x",
      },
      {
        protocolName: "Somnex",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1920467040298483713/B7yqMDE4_400x400.jpg",
        points: 0,
        multiplier: "1.8x",
      },
      {
        protocolName: "Somnia Meme",
        protocolLogo:
          "https://pbs.twimg.com/profile_images/1909551371646291968/-v1dViT0_400x400.jpg",
        points: 0,
        multiplier: "2.5x",
      },
    ],
  },
];

export const getKpiStats = () => {
  const totalTVL = vaults.reduce((sum, vault) => sum + vault.tvlUSD, 0);
  const activeProtocols = protocols.filter((p) => p.status === "Active").length;
  const avgPointsAPR =
    vaults.reduce((sum, vault) => sum + vault.estPointsAPR, 0) / vaults.length;

  return {
    totalTVL,
    activeProtocols,
    avgPointsAPR: Math.round(avgPointsAPR * 10) / 10,
  };
};
