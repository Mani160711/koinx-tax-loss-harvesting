import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

/**
 * ErrorState Component
 * Shows a premium card informing users of fetching errors, with an active Retry button.
 */
const ErrorState = React.memo(({ message = "Failed to fetch tax harvesting data", onRetry }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-12 mb-12">
      <div className="bg-white border border-rose-100 rounded-2xl p-10 text-center shadow-md max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-5 border border-rose-100/50 animate-pulse">
          <FiAlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Unable to Load Portfolio Data
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-6">
          {message}. This could be due to a brief connection outage. Please try again.
        </p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-[#4B7CFF] hover:bg-[#005DFF] text-white font-bold text-sm px-6 py-3 rounded-xl mx-auto shadow-md hover:shadow-lg transition-all focus:ring-4 focus:ring-blue-100 active:scale-95 cursor-pointer"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
});

ErrorState.displayName = 'ErrorState';

export default ErrorState;
