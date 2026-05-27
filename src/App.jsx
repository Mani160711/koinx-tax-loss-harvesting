import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import SavingsBanner from './components/SavingsBanner';
import SummarySection from './components/SummarySection';
import HoldingsTable from './components/HoldingsTable';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { fetchHoldings } from './api/holdingsApi';
import { fetchCapitalGains } from './api/capitalGainsApi';
import { useHarvesting } from './hooks/useHarvesting';
import { calculatePreHarvest } from './utils/calculations';

function App() {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([fetchHoldings(), fetchCapitalGains()])
      .then(([holdingsResponse, capitalGainsResponse]) => {
        if (!active) return;
        
        if (holdingsResponse && holdingsResponse.holdings) {
          setHoldings(holdingsResponse.holdings);
        } else {
          setHoldings([]);
        }

        if (capitalGainsResponse && capitalGainsResponse.capitalGains) {
          setCapitalGains(capitalGainsResponse.capitalGains);
        } else {
          setCapitalGains(null);
        }
        
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setError("Failed to communicate with mock API services");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshTrigger]);

  const handleRetry = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const {
    selected,
    afterHarvest,
    saving,
    toggleSelection,
    toggleAll,
  } = useHarvesting(capitalGains, holdings);

  const preHarvest = useMemo(() => {
    return calculatePreHarvest(capitalGains);
  }, [capitalGains]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans antialiased text-[#1E293B] flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1440px] mx-auto">
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : holdings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <InfoPanel />

            <SavingsBanner saving={saving} />

            <SummarySection 
              preHarvest={preHarvest} 
              afterHarvest={afterHarvest} 
            />

            <HoldingsTable
              holdings={holdings}
              selected={selected}
              onToggle={toggleSelection}
              onToggleAll={toggleAll}
            />
          </>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs font-semibold text-slate-400">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} KoinX Technologies. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">Secure Live Simulation Database Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
