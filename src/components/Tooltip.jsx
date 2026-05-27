import React, { useEffect, useRef } from 'react';

/**
 * Tooltip Component
 * Displays a navy-blue tooltip with an arrow, a description, a link, and closes on outside click.
 */
const Tooltip = React.memo(({ isOpen, onClose, referenceRef }) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      // Don't close if clicking the "How it works?" button itself (referenceRef)
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) &&
        referenceRef.current &&
        !referenceRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen, onClose, referenceRef]);

  if (!isOpen) return null;

  return (
    <div 
      ref={tooltipRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-72 bg-[#0B1528] text-white p-4 rounded-xl shadow-xl text-left border border-slate-800 transition-all duration-200 ease-out"
      role="tooltip"
    >
      {/* Tooltip Arrow */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0B1528] rotate-45 border-t border-l border-slate-800"></div>

      <h4 className="font-semibold text-sm mb-1 text-slate-200">Tax Loss Harvesting</h4>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        Tax-loss harvesting allows you to sell assets that are currently in a loss to offset your realized capital gains, reducing your overall tax liability. By selling and repurchasing, you reset your cost basis.
      </p>
      <div className="flex justify-between items-center">
        <a 
          href="https://koinx.com/blog/crypto-tax-loss-harvesting" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-[#4B7CFF] hover:text-[#4FA4FF] font-medium transition-colors cursor-pointer"
        >
          Learn More &rarr;
        </a>
        <button 
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
          aria-label="Close tooltip"
        >
          Close
        </button>
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
