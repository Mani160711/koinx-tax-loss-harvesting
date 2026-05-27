import React, { useState, useMemo, useCallback } from 'react';
import TableRow from './TableRow';
import { FiChevronDown, FiChevronUp, FiCheckSquare, FiMinusSquare } from 'react-icons/fi';

/**
 * HoldingsTable Component
 * Shows a sticky-header responsive table listing holdings.
 * Renders first 5 rows initially, expandable with a View All button.
 */
const HoldingsTable = React.memo(({ holdings = [], selected = [], onToggle, onToggleAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Determine which rows to display based on isExpanded
  const displayedHoldings = useMemo(() => {
    if (isExpanded || holdings.length <= 5) {
      return holdings;
    }
    return holdings.slice(0, 5);
  }, [holdings, isExpanded]);

  // Select all status checking
  const allSelected = useMemo(() => {
    return holdings.length > 0 && selected.length === holdings.length;
  }, [holdings, selected]);

  const someSelected = useMemo(() => {
    return selected.length > 0 && selected.length < holdings.length;
  }, [selected, holdings]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-12">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
        
        {/* Table Title and Actions Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-800 m-0">
              Tax Harvesting Holdings Analyzer
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select assets to simulate tax loss harvesting and calculate dynamic savings instantly.
            </p>
          </div>

          {/* Quick Selection Status Indicators */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              Selected: <strong className="text-[#4B7CFF]">{selected.length}</strong> / {holdings.length}
            </span>
            {selected.length > 0 && (
              <button
                onClick={onToggleAll}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-rose-100"
              >
                Deselect All
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Table Area */}
        <div className="overflow-x-auto w-full max-h-[500px]">
          <table className="min-w-full table-auto border-collapse text-left relative">
            {/* Sticky Table Header */}
            <thead className="sticky top-0 bg-[#F4F6F9] z-10 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
              <tr>
                {/* Checkbox Header */}
                <th className="py-4 px-4 pl-6 text-center w-16">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={onToggleAll}
                      className="text-[#4B7CFF] hover:text-[#005DFF] transition-colors focus:outline-none cursor-pointer p-0.5 rounded"
                      aria-label={allSelected ? "Deselect all assets" : "Select all assets"}
                    >
                      {allSelected ? (
                        <FiCheckSquare className="w-5.5 h-5.5" />
                      ) : someSelected ? (
                        <FiMinusSquare className="w-5.5 h-5.5 text-[#4B7CFF]/75" />
                      ) : (
                        <div className="w-5 h-5 rounded border-2 border-slate-400/80 bg-white hover:border-[#4B7CFF] transition-colors" />
                      )}
                    </button>
                  </div>
                </th>
                
                <th className="py-4 px-4 text-left font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none">
                  Asset
                </th>
                
                <th className="py-4 px-4 text-left font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none">
                  Holdings
                </th>
                
                <th className="py-4 px-4 text-left font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none">
                  Current Value
                </th>
                
                <th className="py-4 px-4 text-left font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none">
                  Short-Term (STCG)
                </th>
                
                <th className="py-4 px-4 text-left font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none">
                  Long-Term (LTCG)
                </th>
                
                <th className="py-4 px-4 text-center font-extrabold text-xs uppercase tracking-wider text-slate-500 select-none w-44">
                  Amount To Sell
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {displayedHoldings.map((holding) => (
                <TableRow
                  key={holding.id}
                  holding={holding}
                  isSelected={selected.includes(holding.id)}
                  onToggle={onToggle}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* View All / Expand Action Button */}
        {holdings.length > 5 && (
          <div className="py-4 border-t border-slate-100 flex items-center justify-center bg-slate-50/50">
            <button
              onClick={toggleExpand}
              className="flex items-center gap-1.5 text-sm font-bold text-[#4B7CFF] hover:text-[#005DFF] transition-colors focus:outline-none cursor-pointer px-4 py-2 rounded-xl hover:bg-blue-50"
            >
              {isExpanded ? (
                <>
                  <span>View Less</span>
                  <FiChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View All ({holdings.length} Assets)</span>
                  <FiChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

HoldingsTable.displayName = 'HoldingsTable';

export default HoldingsTable;
