import React from 'react';

interface AppLogoProps {
  className?: string;
  height?: number;
  variant?: 'light' | 'dark'; // 'light' for dark bg navbar, 'dark' for white bg modal
  showSubLabel?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  height = 36,
  variant = 'light',
  showSubLabel = true
}) => {
  const isLight = variant === 'light';
  
  // Colors for dark navbar vs light modal
  const mainTextColor = isLight ? '#FFFFFF' : '#0A2540';
  const subTextColor = isLight ? '#E2E8F0' : '#0A2540';
  const bannerBgColor = isLight ? '#003886' : '#0A2540';
  const bannerTextColor = '#FFFFFF';
  
  const planeRightWing = isLight ? '#FFFFFF' : '#0A2540';
  const planeLeftCyan = '#00C4E7';
  const planeLeftPurple = '#A855F7';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Complete Filinvest Business Services Corporation - FBSC Enterprise Capability Hub Logo */}
      <svg
        height={height}
        viewBox="0 0 590 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto max-w-none object-contain filter drop-shadow-xs transition-transform duration-200 group-hover:scale-[1.01]"
      >
        <style>{`
          .fbsc-title-text {
            font-family: 'Montserrat', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            font-weight: 900;
            font-size: 44px;
            letter-spacing: -0.02em;
          }
          .filinvest-sub-text {
            font-family: 'Montserrat', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: -0.01em;
          }
          .hub-banner-text {
            font-family: 'Montserrat', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            font-weight: 800;
            font-size: 15px;
            letter-spacing: 0.08em;
          }
        `}</style>

        {/* Left Word: FBSC */}
        <text x="5" y="52" className="fbsc-title-text" fill={mainTextColor}>
          FBSC
        </text>

        {/* Center 3D Origami Paper Plane Icon */}
        <g transform="translate(136, 12) scale(0.65)">
          {/* Cyan Left Top Facet */}
          <path d="M 0 35 L 36 22 L 30 46 Z" fill={planeLeftCyan} />
          {/* Purple Left Bottom Facet */}
          <path d="M 30 46 L 40 76 L 52 42 Z" fill={planeLeftPurple} />
          {/* Main Right Wing */}
          <path d="M 36 22 L 68 8 L 52 42 Z" fill={planeRightWing} />
          <path d="M 0 35 L 68 8 L 52 42 Z" fill={planeRightWing} opacity={isLight ? 0.9 : 0.95} />
        </g>

        {/* Right Block Top Text: Filinvest Business Services Corporation */}
        <text x="210" y="32" className="filinvest-sub-text" fill={subTextColor}>
          Filinvest Business Services Corporation
        </text>

        {/* Right Block Bottom Banner: ENTERPRISE CAPABILITY HUB */}
        <rect x="208" y="40" width="375" height="26" rx="3" fill={bannerBgColor} />
        <text x="220" y="58" className="hub-banner-text" fill={bannerTextColor}>
          ENTERPRISE CAPABILITY HUB
        </text>
      </svg>

      {showSubLabel && (
        <div className="hidden lg:flex flex-col pl-3 border-l border-white/20 text-left">
          <span className="text-[11px] uppercase font-extrabold tracking-widest text-[#00C4E7] leading-tight">
            Lease Admin
          </span>
          <span className="text-[9px] uppercase font-semibold text-slate-300 leading-tight">
            Migration Framework
          </span>
        </div>
      )}
    </div>
  );
};
