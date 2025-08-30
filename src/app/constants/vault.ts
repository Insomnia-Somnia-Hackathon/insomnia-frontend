export const VAULT_ADDRESSES = {
  vault1: process.env.NEXT_PUBLIC_VAULT_ADDRESS_FIRST!,
  vault2: process.env.NEXT_PUBLIC_VAULT_ADDRESS_SECOND!,
  vault3: process.env.NEXT_PUBLIC_VAULT_ADDRESS_THIRD!,
} as const;
