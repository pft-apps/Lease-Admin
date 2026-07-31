import React from 'react';
import { AppLogo } from './AppLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06234D] text-slate-300 py-8 px-2 sm:px-4 lg:px-6 border-t border-[#003886] mt-12">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
        <div className="flex items-center space-x-3">
          <AppLogo height={24} showSubLabel={false} />
          <span className="font-semibold text-white text-sm border-l border-white/20 pl-3">
            Lease Administration Migration Project
          </span>
        </div>

        <p>&copy; 2026 Enterprise Risk & Intelligence (ERI) / FBSC Enterprise Capability Hub.</p>

        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span>
            Strategy: <strong className="text-white">Improve-Then-Move</strong>
          </span>
          <span>•</span>
          <span>
            Data Error Threshold: <strong className="text-[#00C4E7]">&le; 5%</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};
