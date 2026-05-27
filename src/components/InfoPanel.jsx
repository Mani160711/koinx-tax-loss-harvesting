import React, { useState, useCallback } from 'react';
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';

/**
 * InfoPanel Component
 * Displays a collapsible blue panel that gives users a quick overview of tax-loss harvesting.
 * Default state: Expanded.
 */
const InfoPanel = React.memo(() => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div 
      className="max-w-[1440px] mx-auto mb-6 px-4 md:px-8 mt-6"
    >
      <div 
        className="bg-[#EEF4FF] border border-[#4B7CFF] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
      >
        {/* Panel Header */}
        <button
          onClick={toggleExpand}
          className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none cursor-pointer group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4B7CFF]/15 flex items-center justify-center text-[#4B7CFF]">
              <FiInfo className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#0F172A] m-0">
                Maximize your tax savings with Tax Loss Harvesting
              </h2>
              <p className="text-xs text-[#475569] mt-0.5 hidden sm:block">
                Minimize your crypto taxes by offsetting capital gains with losses.
              </p>
            </div>
          </div>
          <div className="text-slate-400 group-hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-[#4B7CFF]/10">
            {isExpanded ? (
              <FiChevronUp className="w-5 h-5 text-[#4B7CFF]" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-[#4B7CFF]" />
            )}
          </div>
        </button>

        {/* Panel Content (Collapsible with smooth transition) */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-5 pb-5 pt-0 border-t border-[#4B7CFF]/15">
            <ul className="space-y-3 mt-4 text-xs md:text-sm text-[#334155] list-none pl-0">
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7CFF] mt-2 flex-shrink-0" />
                <span>
                  <strong>Offset Capital Gains:</strong> Realize your paper losses to reduce your taxable profits. You can offset short-term gains with short-term/long-term losses, and long-term gains with long-term losses.
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7CFF] mt-2 flex-shrink-0" />
                <span>
                  <strong>Select Holdings:</strong> Select the holdings below that you want to sell. The dashboard dynamically adds these gains or losses to your capital gains profile.
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7CFF] mt-2 flex-shrink-0" />
                <span>
                  <strong>Rebalance Safely:</strong> Sell your losing positions to book the loss, and instantly buy them back if you still believe in their long-term growth (subject to local tax regulations).
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7CFF] mt-2 flex-shrink-0" />
                <span>
                  <strong>Instant calculations:</strong> Watch your effective tax liabilities and potential savings adapt in real time as you check and uncheck different holdings.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

InfoPanel.displayName = 'InfoPanel';

export default InfoPanel;
