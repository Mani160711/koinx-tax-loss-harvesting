import React, { useState, useRef } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import Tooltip from './Tooltip';

/**
 * Header Component
 * Contains the KoinX logo, application title, and "How it works?" helper with Tooltip.
 */
const Header = React.memo(() => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const helpRef = useRef(null);

  const toggleTooltip = () => {
    setIsTooltipOpen((prev) => !prev);
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] py-4 px-6 md:px-12 sticky top-0 z-40 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* KoinX Brand Logo */}
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-[#4B7CFF]"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="48" fill="#4B7CFF" />
            <path
              d="M32 70V30H42V46L60 30H72L50 50L73 70H61L42 53V70H32Z"
              fill="white"
            />
          </svg>
          <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">
            Koin<span className="text-[#4B7CFF]">X</span>
          </span>
        </div>

        {/* Title and Help Tooltip */}
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-[#0F172A] m-0">
              Tax Harvesting
            </h1>
            <button
              ref={helpRef}
              onClick={toggleTooltip}
              className="flex items-center gap-1.5 text-sm font-medium text-[#4B7CFF] hover:text-[#005DFF] transition-colors focus:outline-none cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-50"
              aria-expanded={isTooltipOpen}
              aria-haspopup="true"
            >
              <FiHelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">How it works?</span>
            </button>
          </div>

          <Tooltip
            isOpen={isTooltipOpen}
            onClose={closeTooltip}
            referenceRef={helpRef}
          />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
