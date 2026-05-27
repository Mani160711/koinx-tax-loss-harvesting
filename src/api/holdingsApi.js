export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        holdings: [
          {
            id: "1",
            coin: "XRP",
            coinName: "Ripple",
            logo: "https://cryptologos.cc/logos/ripple-xrp-logo.svg?v=032",
            totalHolding: 12000,
            averageBuyPrice: 42.50,
            currentPrice: 58.20,
            stcg: {
              gain: -12500.00,
              balance: 4000,
            },
            ltcg: {
              gain: 18000.00,
              balance: 8000,
            },
          },
          {
            id: "2",
            coin: "BNB",
            coinName: "Binance Coin",
            logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032",
            totalHolding: 45,
            averageBuyPrice: 28500.00,
            currentPrice: 31200.00,
            stcg: {
              gain: 85000.00,
              balance: 15,
            },
            ltcg: {
              gain: -42000.00,
              balance: 30,
            },
          },
          {
            id: "3",
            coin: "MATIC",
            coinName: "Polygon",
            logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032",
            totalHolding: 25000,
            averageBuyPrice: 72.40,
            currentPrice: 58.10,
            stcg: {
              gain: -38000.00,
              balance: 10000,
            },
            ltcg: {
              gain: -15000.00,
              balance: 15000,
            },
          },
          {
            id: "4",
            coin: "DOGE",
            coinName: "Dogecoin",
            logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=032",
            totalHolding: 85000,
            averageBuyPrice: 8.20,
            currentPrice: 11.50,
            stcg: {
              gain: 14500.00,
              balance: 35000,
            },
            ltcg: {
              gain: 21000.00,
              balance: 50000,
            },
          },
          {
            id: "5",
            coin: "TRX",
            coinName: "TRON",
            logo: "https://cryptologos.cc/logos/tron-trx-logo.svg?v=032",
            totalHolding: 150000,
            averageBuyPrice: 6.80,
            currentPrice: 8.90,
            stcg: {
              gain: 45000.00,
              balance: 60000,
            },
            ltcg: {
              gain: -12000.00,
              balance: 90000,
            },
          },
          {
            id: "6",
            coin: "SHIB",
            coinName: "Shiba Inu",
            logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=032",
            totalHolding: 50000000,
            averageBuyPrice: 0.00068,
            currentPrice: 0.00082,
            stcg: {
              gain: 1500.00,
              balance: 20000000,
            },
            ltcg: {
              gain: -800.00,
              balance: 30000000,
            },
          },
          {
            id: "7",
            coin: "UNI",
            coinName: "Uniswap",
            logo: "https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=032",
            totalHolding: 1200,
            averageBuyPrice: 520.00,
            currentPrice: 480.00,
            stcg: {
              gain: -18000.00,
              balance: 400,
            },
            ltcg: {
              gain: -30000.00,
              balance: 800,
            },
          },
          {
            id: "8",
            coin: "NEAR",
            coinName: "Near Protocol",
            logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=032",
            totalHolding: 3500,
            averageBuyPrice: 220.00,
            currentPrice: 285.00,
            stcg: {
              gain: 42000.00,
              balance: 1500,
            },
            ltcg: {
              gain: -14000.00,
              balance: 2000,
            },
          },
        ],
      });
    }, 800);
  });
};
