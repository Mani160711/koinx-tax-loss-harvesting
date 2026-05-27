# KoinX Tax Loss Harvesting Simulator

A lightweight React web application built with Vite and Tailwind CSS to simulate cryptocurrency tax-loss harvesting. It calculates potential tax savings in real-time as you select assets from your portfolio to sell.

## Screenshots and Interface Explanation

Here is a preview of the main dashboard interface in action:

![KoinX Tax Loss Harvesting Dashboard Preview](./src/assets/Screenshot%202026-05-27%20171100.jpg)

### Dashboard States Explanation

The dashboard features three primary visual and functional states designed to guide the user:

1. **Pre-Harvest Baseline (White Card):** 
   This card shows the user's starting realized profits, losses, and net capital gains as returned directly by the API. It is styled with a white background and acts as the constant reference point for calculations.

2. **After-Harvest Simulation (Blue Gradient Card):** 
   Styled with a modern blue-to-deep-blue gradient, this card updates dynamically in less than a millisecond. When you select assets to simulate selling, the calculator adjusts the profits and losses, displaying your effective gains.

3. **Tax Savings Banner (Green Gradient):** 
   If your checked assets generate a positive tax benefit (by realizing losses to offset gains), a prominent green-gradient banner slides open at the top. It calculates and celebrates your net estimated savings. If no savings are realized, the banner automatically slides closed to keep the workspace clean.

---

### Step-by-Step Mathematical Walkthrough of Selected State

Using the exact numbers from the active multi-selection state, here is how the calculations take place:

#### 1. Baseline Pre-Harvest Capital Gains (Starting point)
*   **Short-Term Capital Gains (STCG):**
    *   Realized Profits = Rs 70,200.88
    *   Realized Losses = Rs 1,548.53
    *   Net STCG = Rs 70,200.88 - Rs 1,548.53 = Rs 68,652.35
*   **Long-Term Capital Gains (LTCG):**
    *   Realized Profits = Rs 5,020.00
    *   Realized Losses = Rs 3,050.00
    *   Net LTCG = Rs 5,020.00 - Rs 3,050.00 = Rs 1,970.00
*   **Total Pre-Harvest Gains:** Rs 68,652.35 + Rs 1,970.00 = Rs 70,622.35

#### 2. Selected Simulation State (After-Harvest Card)
When multiple assets are selected, the simulated realized profits and losses rise accordingly:
*   **Simulated Short-Term (STCG):**
    *   Simulated Profits = Rs 1,69,700.88 (increased by Rs 99,500.00 from baseline)
    *   Simulated Losses = Rs 52,048.53 (increased by Rs 50,500.00 from baseline)
    *   **Net STCG** = Rs 1,69,700.88 - Rs 52,048.53 = **Rs 1,17,652.35**
*   **Simulated Long-Term (LTCG):**
    *   Simulated Profits = Rs 44,020.00 (increased by Rs 39,000.00 from baseline)
    *   Simulated Losses = Rs 60,050.00 (increased by Rs 57,000.00 from baseline)
    *   **Net LTCG** = Rs 44,020.00 - Rs 60,050.00 = **-Rs 16,030.00**
*   **Post-Harvest Effective Gains:** 
    $$\text{Effective Gains} = \text{Net STCG} + \text{Net LTCG}$$
    $$\text{Effective Gains} = \text{Rs 1,17,652.35} + \text{(-Rs 16,030.00)} = \mathbf{\text{Rs 101,622.35}}$$

---

## Key Features

*   **Real-time Calculations:** Instantly recalculates net short-term gains, long-term gains, and potential savings as you check or uncheck assets.
*   **Dynamic Savings Banner:** A celebratory banner that automatically appears when selected assets yield positive tax savings.
*   **Persistent Selections:** Your checkbox selections are persisted to localStorage so they are not lost when you refresh the page.
*   **Indian Rupee Formatting:** Currency is fully localized in INR (e.g. Rs 70,200.88) using the standard en-IN formatting.
*   **Optimized Performance:** Optimized component renders using standard React performance hooks (useMemo, useCallback, React.memo) to ensure high-frequency updates and smooth table scrolling.
*   **Fallback States:** Shimmer skeletons are rendered during data loading, and clean fallback states handle empty data or connection errors.

---

## Tech Stack

*   **Core:** React 19 (JavaScript) + Vite 8
*   **Styling:** Tailwind CSS v4
*   **Icons:** React Icons (Feather Icons pack)

---

## Project Structure

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

## Setup and Installation

Make sure you have Node.js (version 18 or higher) installed.

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Build for production
```bash
npm run build
```

---

## Business Logic and Formulas

### Pre-Harvest Calculations
$$\text{Net STCG} = \text{STCG Profits} - \text{STCG Losses}$$
$$\text{Net LTCG} = \text{LTCG Profits} - \text{LTCG Losses}$$
$$\text{Total Realised Gains} = \text{Net STCG} + \text{Net LTCG}$$

### Post-Harvest Simulation (For Checked Assets)
*   **For selected Short-Term positions:**
    *   If `gain > 0` -> `STCG Profits` increases by `gain`
    *   If `gain <= 0` -> `STCG Losses` increases by `|gain|`
*   **For selected Long-Term positions:**
    *   If `gain > 0` -> `LTCG Profits` increases by `gain`
    *   If `gain <= 0` -> `LTCG Losses` increases by `|gain|`

$$\text{Post-Harvest Effective Gains} = \text{Adjusted Net STCG} + \text{Adjusted Net LTCG}$$
$$\text{Tax Savings} = \text{Pre-Harvest Total Realised} - \text{Post-Harvest Effective}$$

---

## Core Assumptions

1.  **Mock Asset Data:** To avoid forbidden assets like BTC, ETH, SOL, ADA, DOT, LINK, and AVAX, we populate the simulator with 8 alternative coins: XRP, BNB, MATIC, DOGE, TRX, SHIB, UNI, and NEAR.
2.  **API Simulated Latency:** Both mock APIs return standard Javascript Promises wrapped in a setTimeout delay of exactly 800ms to simulate server communication delay.
3.  **Local Storage:** Selection states are synced to localStorage under the key koinx_selected_holdings so they persist through refreshes.
