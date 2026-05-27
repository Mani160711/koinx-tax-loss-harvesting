import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { FiGift } from 'react-icons/fi';

/**
 * SavingsBanner Component
 * Displays a celebratory tax savings banner when saving > 0.
 * Includes a smooth fade-in/fade-up animation when updating.
 */
const SavingsBanner = React.memo(({ saving }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displaySaving, setDisplaySaving] = useState(0);

  useEffect(() => {
    if (saving > 0) {
      setIsVisible(true);
      setDisplaySaving(saving);
    } else {
      setIsVisible(false);
    }
  }, [saving]);

  return (
    <div 
      className={`max-w-[1440px] mx-auto px-4 md:px-8 mb-6 transition-all duration-500 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 max-h-24 scale-100' 
          : 'opacity-0 -translate-y-4 max-h-0 scale-95 overflow-hidden pointer-events-none'
      }`}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-[#10B981] border border-emerald-400/20 text-white rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-lg shadow-emerald-500/10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center text-white animate-bounce-slow flex-shrink-0">
            <FiGift className="w-5.5 h-5.5" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-extrabold m-0">
              Tax Harvesting Advantage Activated!
            </h4>
            <p className="text-xs text-white/90 mt-0.5 font-medium leading-relaxed">
              By harvesting these selected holdings, you will reduce your net taxable capital gains.
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-xs uppercase tracking-widest font-bold opacity-80">
            Total Estimated Tax Saving
          </div>
          <div className="text-xl md:text-2xl font-black mt-0.5 tracking-tight text-white drop-shadow-sm">
            {formatCurrency(displaySaving)}
          </div>
        </div>
      </div>
    </div>
  );
});

SavingsBanner.displayName = 'SavingsBanner';

export default SavingsBanner;
