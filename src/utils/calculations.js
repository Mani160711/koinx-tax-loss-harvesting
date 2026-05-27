/**
 * Calculates Pre-Harvest values from capital gains API response.
 * 
 * @param {Object} capitalGains - The capital gains data from API
 * @returns {Object} Calculated pre-harvest values
 */
export const calculatePreHarvest = (capitalGains) => {
  if (!capitalGains) {
    return {
      stcg: { profits: 0, losses: 0, net: 0 },
      ltcg: { profits: 0, losses: 0, net: 0 },
      realised: 0,
    };
  }

  const { stcg, ltcg } = capitalGains;

  const netST = stcg.profits - stcg.losses;
  const netLT = ltcg.profits - ltcg.losses;
  const realised = netST + netLT;

  return {
    stcg: {
      profits: stcg.profits,
      losses: stcg.losses,
      net: netST,
    },
    ltcg: {
      profits: ltcg.profits,
      losses: ltcg.losses,
      net: netLT,
    },
    realised,
  };
};

/**
 * Calculates After-Harvest values dynamically based on selected holdings.
 * 
 * @param {Object} capitalGains - The base capital gains data from API
 * @param {Array} holdings - All holdings data
 * @param {Array} selectedIds - Selected holdings IDs
 * @returns {Object} Calculated post-harvest values including savings
 */
export const calculateAfterHarvest = (capitalGains, holdings, selectedIds) => {
  if (!capitalGains) {
    return {
      stcg: { profits: 0, losses: 0, net: 0 },
      ltcg: { profits: 0, losses: 0, net: 0 },
      effective: 0,
      saving: 0,
    };
  }

  // Pre-harvest realized gains
  const pre = calculatePreHarvest(capitalGains);

  // Begin with Capital Gains API values
  let stcgProfits = capitalGains.stcg.profits;
  let stcgLosses = capitalGains.stcg.losses;
  let ltcgProfits = capitalGains.ltcg.profits;
  let ltcgLosses = capitalGains.ltcg.losses;

  // Filter selected holdings
  const selectedHoldings = holdings.filter(h => selectedIds.includes(h.id));

  // Process every selected holding
  selectedHoldings.forEach((holding) => {
    // Short-term Capital Gains (STCG)
    if (holding.stcg) {
      const gain = holding.stcg.gain;
      if (gain > 0) {
        stcgProfits += gain;
      } else {
        stcgLosses += Math.abs(gain);
      }
    }

    // Long-term Capital Gains (LTCG)
    if (holding.ltcg) {
      const gain = holding.ltcg.gain;
      if (gain > 0) {
        ltcgProfits += gain;
      } else {
        ltcgLosses += Math.abs(gain);
      }
    }
  });

  // Calculate net gains
  const netST = stcgProfits - stcgLosses;
  const netLT = ltcgProfits - ltcgLosses;
  const effective = netST + netLT;

  // Calculate savings
  const saving = pre.realised - effective;

  return {
    stcg: {
      profits: stcgProfits,
      losses: stcgLosses,
      net: netST,
    },
    ltcg: {
      profits: ltcgProfits,
      losses: ltcgLosses,
      net: netLT,
    },
    effective,
    saving,
  };
};
