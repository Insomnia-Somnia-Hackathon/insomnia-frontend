```markdown
# 🌙 Insomnia Frontend

Frontend application for the **Insomnia Protocol**, a DeFi vault platform built on **Somnia Network**.

This app allows users to connect their wallets, deposit into vaults, earn yield, and farm airdrop points seamlessly.

---

## 🛠 Tech Stack

| Technology   | Purpose                                      |
|--------------|----------------------------------------------|
| **Next.js**  | React framework for production               |
| **Tailwind CSS** | Utility-first CSS for styling            |
| **wagmi**    | React hooks for Ethereum                     |
| **RainbowKit** | Beautiful wallet connection UI              |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (≥18.x)
- [pnpm](https://pnpm.io/) (≥8.x)

Install **pnpm** globally if you haven’t already:
```bash
npm install -g pnpm
```

### 2. Clone the Repository
```bash
git clone https://github.com/your-org/insomnia-frontend.git
cd insomnia-frontend
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Environment Variables
Create `.env.local` in the project root and add:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_VAULT_ADDRESS_FIRST=0xYourVaultAddress1
NEXT_PUBLIC_VAULT_ADDRESS_SECOND=0xYourVaultAddress2
NEXT_PUBLIC_VAULT_ADDRESS_THIRD=0xYourVaultAddress3
NEXT_PUBLIC_POINT_CONTROLLER_ADDRESS=0xYourPointsControllerAddress
```

> **Example (testnet)**  
> ```bash
> NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=375c4a662535c54f8a9b782936810238
> NEXT_PUBLIC_VAULT_ADDRESS_FIRST=0x0fBCa75D8cD14dCf3AF4A45DCBF223aA1E7910F7
> NEXT_PUBLIC_VAULT_ADDRESS_SECOND=0x6261514eE799666265c8c371bf21d0B0F6D85E76
> NEXT_PUBLIC_VAULT_ADDRESS_THIRD=0xD1edDafEb54071Bc78894B554Ad4bc66FA072678
> NEXT_PUBLIC_POINT_CONTROLLER_ADDRESS=0x185427782C214f1455180bf6f1E47Cd52E9096d6
> ```

### 5. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production
```bash
pnpm build
pnpm start
```

---

## 📋 Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud Project ID |
| `NEXT_PUBLIC_VAULT_ADDRESS_FIRST` | Vault #1 contract address |
| `NEXT_PUBLIC_VAULT_ADDRESS_SECOND` | Vault #2 contract address |
| `NEXT_PUBLIC_VAULT_ADDRESS_THIRD` | Vault #3 contract address |
| `NEXT_PUBLIC_POINT_CONTROLLER_ADDRESS` | PointsController contract address |

---

## 📜 License
MIT © Insomnia Protocol
