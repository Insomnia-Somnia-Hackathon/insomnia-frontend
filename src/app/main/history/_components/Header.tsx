import React from 'react';

export default function Header({
  title,
  subtitle,
  titleColor = '#0f172a',
  subtitleColor = '#334155',
  titleSize = '2rem',
}: {
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleSize?: string | number;
}) {
  return (
    <div>
      <h1
        className="mb-1 font-extrabold tracking-tight drop-shadow-sm"
        style={{ color: titleColor, fontSize: titleSize }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="drop-shadow-sm" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
