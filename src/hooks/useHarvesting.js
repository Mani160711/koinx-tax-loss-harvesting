import { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateAfterHarvest } from '../utils/calculations';

const LOCAL_STORAGE_KEY = 'koinx_selected_holdings';

export const useHarvesting = (capitalGains, holdings = []) => {
  const [selected, setSelected] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selected));
    } catch (e) {
      console.error(e);
    }
  }, [selected]);

  const toggleSelection = useCallback((id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      if (prev.length === holdings.length) {
        return [];
      } else {
        return holdings.map((h) => h.id);
      }
    });
  }, [holdings]);

  const afterHarvest = useMemo(() => {
    return calculateAfterHarvest(capitalGains, holdings, selected);
  }, [capitalGains, holdings, selected]);

  const saving = useMemo(() => {
    return afterHarvest.saving;
  }, [afterHarvest.saving]);

  return {
    selected,
    afterHarvest,
    saving,
    toggleSelection,
    toggleAll,
  };
};
