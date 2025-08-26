import React from 'react';

export default function GlassStat({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border shadow-sm">
      {/* strong glass for readability */}
      <div className="absolute inset-0 rounded-xl bg-white/80 backdrop-blur-xl ring-1 ring-white/50" />
      <div
        className="absolute inset-0 rounded-xl opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(90% 90% at 18% 100%, rgba(236,72,153,0.10), transparent 60%), radial-gradient(90% 90% at 82% 0%, rgba(14,165,233,0.10), transparent 60%)',
        }}
      />
      <div className="relative z-10 p-4">
        <div
          className="text-xl font-extrabold drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
          style={{ color: accent }}
        >
          {value}
        </div>
        <div className="text-sm" style={{ color: '#334155' }}>
          {title}
        </div>
      </div>
    </div>
  );
}
