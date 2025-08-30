"use client";

import Image from "next/image";
import { Vault, userVaultRewards } from "@/app/(lib)/vaultsData";
import RewardsRow from "@/app/main/(components)/RewardsRow";
import { Section } from "./helper";
import { useVaultStatic, formatLock } from "@/app/hooks/vaults/useReadVaults";
import SimpleTotalPointsDisplay from "../../_components/TotalPointDisplay";
import { getVaultKeyByAddress } from "@/app/hooks/usePointController";

type TabId = "overview" | "strategies" | "risks" | "docs";

interface VaultTabContentProps {
  vault: Vault;
  activeTab: TabId;
}

export default function VaultTabContent({
  vault,
  activeTab,
}: VaultTabContentProps) {
  return (
    <div
      className="rounded-2xl border shadow-sm p-6 sm:p-8"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        borderColor: "rgba(15,23,42,0.06)",
      }}
    >
      {activeTab === "overview" && <OverviewTab vault={vault} />}

      {activeTab === "strategies" && (
        <div className="space-y-4">
          {vault.strategies.map((strategy, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "rgba(15,23,42,0.03)",
                borderColor: "rgba(15,23,42,0.06)",
              }}
            >
              <div className="font-medium text-slate-900">{strategy}</div>
              <div className="text-sm text-slate-600 mt-1">
                Automated strategy optimized for maximum point accumulation.
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "risks" && (
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl border"
            style={{
              backgroundColor: "rgba(15,23,42,0.03)",
              borderColor: "rgba(15,23,42,0.06)",
            }}
          >
            <p className="text-slate-600">
              This vault carries {vault.risk.toLowerCase()} risk due to its
              strategy composition and protocol exposure. Always assess your
              risk tolerance before depositing.
            </p>
          </div>
        </div>
      )}

      {activeTab === "docs" && (
        <div className="text-slate-600">
          Detailed documentation, audit reports, and technical specifications
          would be available here.
        </div>
      )}
    </div>
  );
}

function OverviewTab({ vault }: { vault: Vault }) {
  const userRewards = userVaultRewards.find((r) => r.vaultSlug === vault.slug);
  const { lockupSeconds } = useVaultStatic(vault.address);
  const vaultKey = getVaultKeyByAddress(vault.address);

  return (
    <div className="space-y-8">
      <Section title="Accepted Assets">
        <div className="flex flex-wrap gap-2">
          {vault.acceptedAssets.map((asset) => (
            <div
              key={asset}
              className="p-3 gap-2 rounded-full text-xs font-semibold flex"
              style={{
                backgroundColor: "rgba(15,23,42,0.05)",
                color: "#0f172a",
                border: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              {asset}
              <Image
                src="/Images/Logo/somnia_logo.png"
                alt="logo-stt"
                width={17}
                height={10}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Your Rewards :">
        {vaultKey ? (
          <div className="space-y-4">
            <SimpleTotalPointsDisplay vaultKey={vaultKey} />
            <p className="text-black font-bold">Airdrop Points Rewards :</p>
            {userRewards && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userRewards.rewardBalances.map((reward, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(15,23,42,0.02)",
                      borderColor: "rgba(15,23,42,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full overflow-hidden border"
                        style={{ borderColor: "rgba(15,23,42,0.06)" }}
                      >
                        <Image
                          src={reward.protocolLogo}
                          alt={reward.protocolName}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm">
                          {reward.protocolName}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-semibold px-2 py-1 rounded-full"
                            style={{
                              color: "#ec4899",
                              backgroundColor: "rgba(236,72,153,0.1)",
                            }}
                          >
                            {reward.multiplier}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="p-6 rounded-xl border text-center"
            style={{
              backgroundColor: "rgba(15,23,42,0.02)",
              borderColor: "rgba(15,23,42,0.06)",
            }}
          >
            <p className="text-slate-600">
              Unable to load vault data. Please try again later.
            </p>
          </div>
        )}
      </Section>

      {/* <Section title="Rewards from">
        <RewardsRow
          logos={vault.rewardsLogos}
          multipliers={vault.rewardsMultipliers}
        />
      </Section> */}

      <Section title="Withdrawal Time">
        <p className="text-slate-600">
          {formatLock(lockupSeconds) || vault.withdrawalTime} — Funds are locked
          to optimize yield strategies.
        </p>
      </Section>
    </div>
  );
}
