import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

/**
 * SummaryCard Component
 * Renders capital gains summary.
 * Pre-harvest card is white.
 * After-harvest card is blue-gradient with white text.
 */
const SummaryCard = React.memo(({ title, stcg, ltcg, realised, type = 'pre' }) => {
  const isAfter = type === 'after';

  return (
    <div
      className={`rounded-2xl p-6 shadow-md transition-all duration-300 ${
        isAfter
          ? 'bg-gradient-to-br from-[#4FA4FF] to-[#005DFF] text-white'
          : 'bg-white text-slate-800 border border-slate-100'
      }`}
    >
      {/* Card Title */}
      <div className="flex items-center justify-between border-b pb-4 mb-4 ${isAfter ? 'border-white/10' : 'border-slate-100'}">
        <h3 className={`text-base font-bold uppercase tracking-wider ${isAfter ? 'text-white/90' : 'text-slate-500'}`}>
          {title}
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
            isAfter ? 'bg-white/25 text-white' : 'bg-[#EEF4FF] text-[#4B7CFF]'
          }`}
        >
          {isAfter ? 'Dynamic After-Tax' : 'Standard Pre-Tax'}
        </span>
      </div>

      {/* Grid of STCG and LTCG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Short Term Capital Gains (STCG) */}
        <div className={`p-4 rounded-xl ${isAfter ? 'bg-white/10 border border-white/5' : 'bg-[#F8FAFF] border border-[#EEF4FF]'}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`p-1.5 rounded-lg ${isAfter ? 'bg-white/20' : 'bg-blue-50'}`}>
              <FiTrendingUp className={`w-4 h-4 ${isAfter ? 'text-white' : 'text-[#4B7CFF]'}`} />
            </span>
            <span className="font-bold text-xs md:text-sm uppercase tracking-wide opacity-90">Short-Term (STCG)</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="opacity-80">Realized Profits:</span>
              <span className={`font-semibold ${isAfter ? 'text-white' : 'text-emerald-600'}`}>
                {formatCurrency(stcg.profits)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="opacity-80">Realized Losses:</span>
              <span className={`font-semibold ${isAfter ? 'text-white' : 'text-rose-500'}`}>
                {formatCurrency(stcg.losses)}
              </span>
            </div>
            <div className={`border-t pt-2 mt-2 flex justify-between items-center text-xs md:text-sm font-bold ${isAfter ? 'border-white/10' : 'border-slate-200'}`}>
              <span>Net STCG:</span>
              <span className={stcg.net < 0 ? (isAfter ? 'text-white' : 'text-rose-600') : (isAfter ? 'text-white' : 'text-slate-800')}>
                {formatCurrency(stcg.net)}
              </span>
            </div>
          </div>
        </div>

        {/* Long Term Capital Gains (LTCG) */}
        <div className={`p-4 rounded-xl ${isAfter ? 'bg-white/10 border border-white/5' : 'bg-[#F8FAFF] border border-[#EEF4FF]'}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`p-1.5 rounded-lg ${isAfter ? 'bg-white/20' : 'bg-blue-50'}`}>
              <FiTrendingDown className={`w-4 h-4 ${isAfter ? 'text-white' : 'text-[#4B7CFF]'}`} />
            </span>
            <span className="font-bold text-xs md:text-sm uppercase tracking-wide opacity-90">Long-Term (LTCG)</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="opacity-80">Realized Profits:</span>
              <span className={`font-semibold ${isAfter ? 'text-white' : 'text-emerald-600'}`}>
                {formatCurrency(ltcg.profits)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="opacity-80">Realized Losses:</span>
              <span className={`font-semibold ${isAfter ? 'text-white' : 'text-rose-500'}`}>
                {formatCurrency(ltcg.losses)}
              </span>
            </div>
            <div className={`border-t pt-2 mt-2 flex justify-between items-center text-xs md:text-sm font-bold ${isAfter ? 'border-white/10' : 'border-slate-200'}`}>
              <span>Net LTCG:</span>
              <span className={ltcg.net < 0 ? (isAfter ? 'text-white' : 'text-rose-600') : (isAfter ? 'text-white' : 'text-slate-800')}>
                {formatCurrency(ltcg.net)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Footer: Total Realised Gains */}
      <div
        className={`mt-6 p-4 rounded-xl flex items-center justify-between transition-all duration-300 ${
          isAfter ? 'bg-white/15 border border-white/10' : 'bg-slate-50 border border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`p-2 rounded-full ${isAfter ? 'bg-white/20' : 'bg-blue-100/60 text-[#4B7CFF]'}`}>
            <FiDollarSign className="w-5 h-5" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-70">
              {isAfter ? 'Effective Capital Gains' : 'Total Realised Capital Gains'}
            </div>
            <div className="text-xs opacity-50 font-medium">netST + netLT</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg md:text-2xl font-black">
            {formatCurrency(realised)}
          </div>
        </div>
      </div>
    </div>
  );
});

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;
