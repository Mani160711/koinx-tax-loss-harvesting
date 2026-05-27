/**
 * Capital Gains Mock API
 * Returns the exact pre-harvest capital gains from the assignment response.
 */
export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capitalGains: {
          stcg: {
            profits: 70200.88,
            losses: 1548.53,
          },
          ltcg: {
            profits: 5020,
            losses: 3050,
          },
        },
      });
    }, 800);
  });
};
