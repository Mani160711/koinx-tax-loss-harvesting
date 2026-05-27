import { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateAfterHarvest } from '../utils/calculations';

const LOCAL_STORAGE_KEY = 'koinx_selected_holdings';

/**
 * Custom Hook for managing tax harvesting selections and calculations.
 * 
 * @param {Object} capitalGains - Pre-harvest capital gains from API
 * @param {Array} holdings - Cryptocurrency holdings from API
 * @returns {Object} Selections, calculations, and utility toggles
 */
export const useHarvesting = (capitalGains, holdings = []) => {
  // Initialize selections from localStorage if present, otherwise empty array
  const [selected, setSelected] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse selected holdings from localStorage", e);
      return [];
    }
  });

  // Sync selections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selected));
    } catch (e) {
      console.error("Failed to persist selected holdings to localStorage", e);
    }
  }, [selected]);

  // Handle single row selection toggle
  const toggleSelection = useCallback((id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  // Handle select all / deselect all
  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      // If all are selected, deselect all
      if (prev.length === holdings.length) {
        return [];
      } else {
        // Otherwise select all IDs
        return holdings.map((h) => h.id);
      }
    });
  }, [holdings]);

  // Recalculate After Harvest and Savings whenever selections or data changes
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
