"use client";

import React, { ReactNode } from "react";

interface KpiProps {
  label: string;
  value: ReactNode;
  highlight?: boolean;
  muted?: boolean;
}

export function Kpi({ label, value, highlight, muted }: KpiProps) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div
        className={
          highlight ? "text-3xl font-extrabold" : "text-lg font-semibold"
        }
        style={{ color: highlight ? "#10b981" : muted ? "#64748b" : "#0f172a" }}
      >
        {value}
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

export function cnBadge(input: string): string {
  return `${input} rounded-full`;
}
