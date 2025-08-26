export const designTokens = {
  brand: {
    name: "Somnia Airdrop Points Vault",
    mood: "dark-neon, futuristic, friendly",
    keywords: ["vault", "airdrop points", "on-chain", "Somnia", "DeFi"]
  },
  colors: {
    background: "#0B1117",
    surface: "#0F1621", 
    surfaceAlt: "#0D141D",
    border: "rgba(255,255,255,0.06)",
    textPrimary: "#E6F0FF",
    textSecondary: "#A8B3C7",
    muted: "#77829A",
    accent: "#8BFF5B",
    accentAlt: "#71E056",
    info: "#64B5FF",
    warning: "#F3C969",
    danger: "#FF6B6B",
    success: "#39D98A",
    kpiGlass: "rgba(139,255,91,0.06)"
  },
  effects: {
    shadowSoft: "0 8px 30px rgba(0,0,0,0.25)",
    shadowGlow: "0 0 0 3px rgba(139,255,91,0.12)",
    blurGlass: "12px"
  },
  radii: {
    xl: "20px",
    lg: "14px", 
    md: "10px",
    pill: "999px"
  },
  typography: {
    fontHead: "Inter, ui-sans-serif, system-ui",
    fontBody: "Inter, ui-sans-serif, system-ui",
    scale: {
      h1: "clamp(32px, 4vw, 48px)",
      h2: "clamp(24px, 3vw, 32px)",
      h3: "20px",
      body: "15px",
      caption: "13px"
    },
    weights: { 
      regular: 400, 
      medium: 500, 
      semibold: 600, 
      bold: 700 
    },
    letterSpacing: { 
      tight: "-0.01em", 
      wide: "0.02em" 
    }
  },
  layout: {
    maxWidth: "1200px",
    sectionY: "96px",
    gridGap: "24px",
    cardPadding: "20px"
  },
  components: {
    button: {
      primary: {
        bg: "#8BFF5B",
        text: "#0B1117",
        hoverBg: "#71E056",
        shadow: "0 8px 20px rgba(139,255,91,0.25)",
        radius: "12px"
      },
      secondary: {
        bg: "transparent",
        border: "1px solid rgba(255,255,255,0.10)",
        text: "#E6F0FF",
        hoverBg: "rgba(255,255,255,0.04)",
        radius: "12px"
      }
    },
    card: {
      bg: "#0F1621",
      border: "1px solid rgba(255,255,255,0.06)",
      radius: "20px",
      shadow: "0 8px 24px rgba(0,0,0,0.25)",
      kpiPanel: {
        bg: "linear-gradient(180deg, rgba(139,255,91,0.08), rgba(139,255,91,0.02))",
        backdropBlur: "12px",
        border: "1px solid rgba(139,255,91,0.18)"
      }
    },
    badge: {
      success: { bg: "rgba(57,217,138,0.16)", text: "#39D98A" },
      info: { bg: "rgba(100,181,255,0.16)", text: "#64B5FF" },
      muted: { bg: "rgba(255,255,255,0.06)", text: "#A8B3C7" }
    },
    statPill: {
      bg: "rgba(255,255,255,0.04)",
      text: "#E6F0FF",
      radius: "999px",
      padding: "8px 14px"
    },
    tabs: {
      indicator: { bg: "#ffafcc", height: "2px" },
      item: { text: "#A8B3C7", activeText: "#E6F0FF" }
    }
  }
} as const;

export type DesignTokens = typeof designTokens;