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

export const calculateAfterHarvest = (capitalGains, holdings, selectedIds) => {
  if (!capitalGains) {
    return {
      stcg: { profits: 0, losses: 0, net: 0 },
      ltcg: { profits: 0, losses: 0, net: 0 },
      effective: 0,
      saving: 0,
    };
  }

  const pre = calculatePreHarvest(capitalGains);

  let stcgProfits = capitalGains.stcg.profits;
  let stcgLosses = capitalGains.stcg.losses;
  let ltcgProfits = capitalGains.ltcg.profits;
  let ltcgLosses = capitalGains.ltcg.losses;

  const selectedHoldings = holdings.filter(h => selectedIds.includes(h.id));

  selectedHoldings.forEach((holding) => {
    if (holding.stcg) {
      const gain = holding.stcg.gain;
      if (gain > 0) {
        stcgProfits += gain;
      } else {
        stcgLosses += Math.abs(gain);
      }
    }

    if (holding.ltcg) {
      const gain = holding.ltcg.gain;
      if (gain > 0) {
        ltcgProfits += gain;
      } else {
        ltcgLosses += Math.abs(gain);
      }
    }
  });

  const netST = stcgProfits - stcgLosses;
  const netLT = ltcgProfits - ltcgLosses;
  const effective = netST + netLT;

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
