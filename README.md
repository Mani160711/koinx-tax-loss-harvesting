# KoinX Tax Loss Harvesting Simulator

A lightweight React web application built with Vite and Tailwind CSS to simulate cryptocurrency tax-loss harvesting. It calculates potential tax savings in real-time as you select assets from your portfolio to sell.

## 📸 Screenshots

Here is a preview of the main dashboard interface:

![KoinX Tax Loss Harvesting Dashboard Preview](./src/assets/hero.png)

---

## 🚀 Key Features

*   **Real-time Calculations:** Instantly recalculates net short-term gains, long-term gains, and potential savings as you check/uncheck assets.
*   **Dynamic Savings Banner:** A celebratory banner that automatically appears when selected assets yield positive tax savings.
*   **Persistent Selections:** Your checkbox selections are persisted to `localStorage` so they aren't lost when you refresh the page.
*   **Indian Rupee formatting:** Currency is fully localized in INR (e.g. ₹70,200.88).
*   **Optimized Performance:** Optimized component renders using standard React performance hooks (`useMemo`, `useCallback`, `React.memo`).
*   **Fallback States:** Shimmer skeletons are rendered during data loading, and clean fallback states handle empty data or errors.

---

## 🛠️ Tech Stack

*   **Core:** React 19 (JavaScript) + Vite 8
*   **Styling:** Tailwind CSS v4
*   **Icons:** React Icons (`react-icons/fi`)

---

## 📂 Project Structure

```text
src/
├── api/
│   ├── capitalGainsApi.js     # Mock API returning pre-harvest capital gains
│   └── holdingsApi.js         # Mock API returning cryptocurrency holdings
│
├── components/
│   ├── Header.jsx             # Topbar with KoinX logo and tooltip trigger
│   ├── Tooltip.jsx            # Explanatory tooltip with click-outside listener
│   ├── InfoPanel.jsx          # Collapsible tax information accordion
│   ├── SavingsBanner.jsx      # Slide-in tax savings celebratory banner
│   ├── SummaryCard.jsx        # Reusable card for capital gains stats
│   ├── SummarySection.jsx     # Side-by-side pre/after harvest wrapper
│   ├── HoldingsTable.jsx      # Expandable holdings table with select all
│   ├── TableRow.jsx           # Individual table rows with selection styling
│   ├── SkeletonLoader.jsx     # Shimmer loader for async states
│   ├── EmptyState.jsx         # Fallback view for empty portfolios
│   └── ErrorState.jsx         # Fallback view for api fetch failures
│
├── hooks/
│   └── useHarvesting.js       # Core state hook managing selections & math
│
├── utils/
│   ├── calculations.js        # Pure functions for tax savings equations
│   └── formatCurrency.js      # Utility to format INR currency strings
│
├── App.jsx                    # Root component orchestrating async fetch
├── main.jsx                   # React mounting point
└── index.css                  # Custom theme config & Inter font imports
```

---

## ⚙️ Setup & Installation

Make sure you have Node.js (version 18+) installed.

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 🧠 Business Logic & Formulas

### Pre-Harvest Calculations
$$\text{Net STCG} = \text{STCG Profits} - \text{STCG Losses}$$
$$\text{Net LTCG} = \text{LTCG Profits} - \text{LTCG Losses}$$
$$\text{Total Realised Gains} = \text{Net STCG} + \text{Net LTCG}$$

### Post-Harvest Simulation (For Checked Assets)
*   **For selected Short-Term positions:**
    *   If `gain > 0` $\rightarrow$ `STCG Profits` increases by `gain`
    *   If `gain <= 0` $\rightarrow$ `STCG Losses` increases by `|gain|`
*   **For selected Long-Term positions:**
    *   If `gain > 0` $\rightarrow$ `LTCG Profits` increases by `gain`
    *   If `gain <= 0` $\rightarrow$ `LTCG Losses` increases by `|gain|`

$$\text{Post-Harvest Effective Gains} = \text{Adjusted Net STCG} + \text{Adjusted Net LTCG}$$
$$\text{Tax Savings} = \text{Pre-Harvest Total Realised} - \text{Post-Harvest Effective}$$

---

## 🔮 Core Assumptions

1.  **Mock Asset Data:** To avoid forbidden assets like BTC/ETH/SOL/ADA, we populate the simulator with 8 alternative coins: XRP, BNB, MATIC, DOGE, TRX, SHIB, UNI, and NEAR.
2.  **API Simulated Latency:** Both mock APIs return standard Javascript Promises wrapped in a `setTimeout` delay of exactly **800ms** to simulate server communication delay.
3.  **Local Storage:** Selection states are synced to `localStorage` under the key `koinx_selected_holdings` so they persist through refreshes.
