import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * TableRow Component
 * Renders a single row of cryptocurrency holding with interactive toggle, select formatting and responsive grid.
 */
const TableRow = React.memo(({ holding, isSelected, onToggle }) => {
  const {
    id,
    coin,
    coinName,
    logo,
    totalHolding,
    averageBuyPrice,
    currentPrice,
    stcg,
    ltcg,
  } = holding;

  const currentValue = currentPrice * totalHolding;

  // Formatting large holding values nicely (e.g. Shiba Inu numbers)
  const formatHoldingCount = (val) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 4,
    }).format(val);
  };

  const getGainColorClass = (gain) => {
    if (gain > 0) return 'text-emerald-600 font-semibold';
    if (gain < 0) return 'text-rose-600 font-semibold';
    return 'text-slate-500 font-medium';
  };

  const formatGain = (gain) => {
    if (gain === 0) return '₹0.00';
    return formatCurrency(gain, true);
  };

  return (
    <tr
      onClick={() => onToggle(id)}
      className={`border-b border-slate-100 transition-colors duration-200 cursor-pointer select-none group ${
        isSelected ? 'bg-[#EEF4FF]' : 'hover:bg-[#F8FAFF] bg-white'
      }`}
    >
      {/* 1. Checkbox Column */}
      <td className="py-4 px-4 pl-6 text-center">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}} // Done by tr onClick
            className="w-5.5 h-5.5 rounded border-slate-300 text-[#4B7CFF] focus:ring-[#4B7CFF] focus:ring-offset-0 focus:outline-none transition-all cursor-pointer accent-[#4B7CFF]"
            aria-label={`Select ${coinName}`}
          />
        </div>
      </td>

      {/* 2. Asset Column */}
      <td className="py-4 px-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100/60 p-1 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            {logo ? (
              <img
                src={logo}
                alt={coinName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cryptologos.cc/logos/generic-logo.svg';
                }}
              />
            ) : (
              <div className="w-full h-full bg-[#4B7CFF]/10 text-[#4B7CFF] font-bold text-xs flex items-center justify-center">
                {coin.slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <span className="font-extrabold text-sm text-[#0F172A] block tracking-wide">
              {coin}
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              {coinName}
            </span>
          </div>
        </div>
      </td>

      {/* 3. Holdings Column */}
      <td className="py-4 px-4 text-left">
        <span className="font-bold text-sm text-slate-800 block">
          {formatHoldingCount(totalHolding)}
        </span>
        <span className="text-xs text-slate-500 block">
          Avg: {formatCurrency(averageBuyPrice)}
        </span>
      </td>

      {/* 4. Current Value Column */}
      <td className="py-4 px-4 text-left font-black text-sm text-slate-800">
        {formatCurrency(currentValue)}
      </td>

      {/* 5. Short-term Capital Gains Column */}
      <td className="py-4 px-4 text-left">
        {stcg ? (
          <>
            <span className={`text-sm block ${getGainColorClass(stcg.gain)}`}>
              {formatGain(stcg.gain)}
            </span>
            <span className="text-xs text-slate-500 block">
              Bal: {formatHoldingCount(stcg.balance)}
            </span>
          </>
        ) : (
          <span className="text-xs text-slate-400 font-medium">-</span>
        )}
      </td>

      {/* 6. Long-term Capital Gains Column */}
      <td className="py-4 px-4 text-left">
        {ltcg ? (
          <>
            <span className={`text-sm block ${getGainColorClass(ltcg.gain)}`}>
              {formatGain(ltcg.gain)}
            </span>
            <span className="text-xs text-slate-500 block">
              Bal: {formatHoldingCount(ltcg.balance)}
            </span>
          </>
        ) : (
          <span className="text-xs text-slate-400 font-medium">-</span>
        )}
      </td>

      {/* 7. Amount To Sell Column */}
      <td className="py-4 px-4 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide transition-all ${
            isSelected
              ? 'bg-[#EEF4FF] text-[#4B7CFF] border border-[#4B7CFF]/20 font-black'
              : 'text-slate-400 font-medium'
          }`}
        >
          {isSelected ? formatHoldingCount(totalHolding) : '-'}
        </span>
      </td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
