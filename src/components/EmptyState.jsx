import React from 'react';
import { FiInbox } from 'react-icons/fi';

/**
 * EmptyState Component
 * Shows an elegant prompt when there are no holdings to display.
 */
const EmptyState = React.memo(() => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-12 mb-12">
      <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-md max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-5 border border-slate-100">
          <FiInbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          No Holdings Available
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          We couldn't find any cryptocurrency holdings associated with your portfolio. Try syncing your wallets or checking back later.
        </p>
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
