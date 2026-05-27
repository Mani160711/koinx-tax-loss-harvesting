# KoinX Tax Loss Harvesting Simulator

A high-performance, pixel-perfect production-ready React web application designed to simulate and calculate dynamic cryptocurrency tax loss harvesting savings instantly. Built using **React (JS)**, **Vite**, and **Tailwind CSS v4**.

## 🚀 Key Features

*   **⚡ Instant Simulation:** Toggle holdings dynamically and observe after-harvest realized profits, losses, net capital gains, and effective gains change in real time.
*   **🎉 Auto-calculated Savings:** Beautiful celebratory notification banner revealing your exact tax savings, updating on-the-fly when savings > 0.
*   **📁 Custom Selections Persistence:** Automatic persistent storage of user selections using `localStorage`.
*   **📐 Strict Business Calculations:** Precise tax equations accounting for Short-Term (STCG) and Long-Term (LTCG) profits & losses as per assignment requirements.
*   **✨ Exquisite UI & UX:** Pixel-perfect cards, a collapsible info panel with 300ms transition animations, a navy hover tooltip on how harvesting works, and a responsive sticky-header table.
*   **🎨 Harmonic Styling:** Curated, Harmonic HSL brand color system with `#F5F7FA` card background, `#EEF4FF` selection highlighting, and `#F8FAFF` hover states.
*   **🌀 Modern Performance:** Utilizes `React.memo`, `useCallback`, and `useMemo` hooks in all key components to optimize re-renders and enhance scroll performance.
*   **⏳ Skeleton shimmer loading:** Shimmer placeholders for simulated load states, custom error states with active retry mechanisms, and custom empty states.

---

## 🛠️ Tech Stack

*   **Framework:** React 19 (JavaScript) + Vite 8
*   **Styling:** Tailwind CSS v4 (native `@import` in CSS)
*   **Icons:** React Icons (`react-icons/fi` & `react-icons/tb`)
*   **Deployment Ready:** SPA rewrites defined in `vercel.json`

---

## 📸 Screenshots

Here is a preview of the high-fidelity dynamic dashboard in action:

![KoinX Tax Loss Harvesting Dashboard Preview](./src/assets/hero.png)

---

## 📂 Project Structure

```text
koinx-tax-harvesting/
│
├── public/
├── src/
│   ├── api/
│   │   ├── capitalGainsApi.js     # Concurrently loads exact assignment capital gains metrics (800ms)
│   │   └── holdingsApi.js         # Delivers exact holdings JSON structure excluding forbidden tokens (800ms)
│   │
│   ├── components/
│   │   ├── Header.jsx             # Top bar featuring KoinX SVG logo and tooltip trigger
│   │   ├── Tooltip.jsx            # Dark navy portal tooltip closing on outside click
│   │   ├── InfoPanel.jsx          # Collapsible tax information container with smooth transition
│   │   ├── SavingsBanner.jsx      # Green-gradient congratulatory estimated tax savings widget
│   │   ├── SummaryCard.jsx        # Reusable card showcasing detailed profits, losses, net and gains
│   │   ├── SummarySection.jsx     # Places standard pre-harvest and dynamic after-harvest summary side-by-side
│   │   ├── HoldingsTable.jsx      # Scrollable table container managing select all & expandable view
│   │   ├── TableRow.jsx           # Highlighting selected rows in brand colors and displaying amounts to sell
│   │   ├── SkeletonLoader.jsx     # Shimmer skeleton mimicking real components during load time
│   │   ├── EmptyState.jsx         # Card informing users if no assets are found in portfolio
│   │   └── ErrorState.jsx         # Beautiful error interface with an active Retry button
│   │
│   ├── hooks/
│   │   └── useHarvesting.js       # Dynamic selection, localStorage persistence and calculation management hook
│   │
│   ├── utils/
│   │   ├── calculations.js        # Strict business logic formulas for tax savings
│   │   └── formatCurrency.js      # Formats numbers to Indian Rupees currency format (en-IN)
│   │
│   ├── App.jsx                    # Controls async states, concurrently fetches data and renders pages
│   ├── main.jsx                   # Application bootstrap
│   └── index.css                  # Custom theme variables, Inter fonts and tailwind import
│
├── vercel.json                    # Single page app redirects configuration
├── package.json                   # Project packages and dev dependencies
└── README.md                      # Comprehensive developer setup guide
```

---

## ⚙️ Setup & Installation Instructions

Ensure you have [Node.js](https://nodejs.org/) (version 18+) installed on your local machine.

### 1. Clone the repository and navigate to directory:
```bash
cd koinx-tax-harvesting
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

### 4. Build the application for production:
```bash
npm run build
```
This compiles optimized files to the `dist/` directory, ready to serve or host on platforms like Vercel.

---

## 🧠 Business Logic & Calculations

### 1. Pre-Harvest
*   `netST = profits - losses`
*   `netLT = profits - losses`
*   `realised = netST + netLT`

### 2. After-Harvest (Simulation)
Starting with the base Capital Gains API profits & losses:
For each selected holding:
*   **Short-Term Gain (STCG):**
    *   If `holding.stcg.gain > 0` $\rightarrow$ `stcg.profits += gain`
    *   Else `holding.stcg.gain <= 0` $\rightarrow$ `stcg.losses += abs(gain)`
*   **Long-Term Gain (LTCG):**
    *   If `holding.ltcg.gain > 0` $\rightarrow$ `ltcg.profits += gain`
    *   Else `holding.ltcg.gain <= 0` $\rightarrow$ `ltcg.losses += abs(gain)`

*Then compute final dynamic metrics:*
*   `netST = profits - losses`
*   `netLT = profits - losses`
*   `effective = netST + netLT`
*   `saving = preRealised - effective`

---

## 🔮 Core Assumptions

1.  **INDIAN RUPEE (INR) SPECIFICS:** The dashboard is custom-tailored to handle crypto taxes within the Indian context, using strict `en-IN` rupee formatting for large holding sizes.
2.  **FORBIDDEN ASSETS:** Standard crypto portfolio simulators invent tokens like BTC, ETH, and SOL. Following strict instructions, this simulator utilizes 8 active alternative assets: **XRP, BNB, MATIC, DOGE, TRX, SHIB, UNI, and NEAR** with non-overlapping ID structures to avoid collision.
3.  **ASYNCHRONOUS LATENCY:** The two APIs use standard JS Promises with `setTimeout` configured to precisely **800ms** to simulate real-world web loading behavior.
4.  **SELECTION RETENTION:** The application uses `localStorage` to save checked holdings so user simulations are fully retained upon manual refreshes or close-outs.
