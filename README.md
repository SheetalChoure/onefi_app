# React Native Marketplace Screen

A responsive, high-performance product marketplace catalog component built with **React Native** and **JavaScript/JSX**. It features dynamic data integration via custom hooks, modal product detail views, custom variant selections, and built-in fallback data with real product specifications.

---

## 🚀 Features

* **Grid Layout:** 2-column list layout optimized using React Native's `FlatList`.
* **Dynamic Hook Integration:** Seamlessly fetches data using `useMarketplace()` with built-in loading and error fallback UI states.
* **Rich Default Catalog:** Includes fallback data (`MARKETPLACE_PRODUCTS`) complete with high-resolution imagery, spec sheets, color options, and storage configurations.
* **Modal Product Detail View:** Interactive product selection and modal popups using `ProductDetailsModal`.
* **Safeguarded Checkout Flows:** Graceful error handling in variant/plan selection callbacks to prevent standard UI crashes on empty selections.

---

## 🛠️ Installation & Setup

### Prerequisites

Ensure your host app has the required directory dependencies and theme configurations:

* **React Native** (`0.68+` or **Expo**)
* Theme modules at `../../../theme/` (`colors`, `typography`, `spacing`)
* Utilities at `../../../utils/currencyFormatter`

### Module Setup

Place the file inside your screen directory (e.g., `src/screens/MarketplaceScreen.jsx`):

```bash
src/
├── components/
│   ├── ProductCard.jsx
│   └── ProductDetailsModal.jsx
├── hooks/
│   └── useMarketplace.js
├── screens/
│   └── MarketplaceScreen.jsx
└── utils/
    └── currencyFormatter.js



<img width="1356" height="655" alt="Screenshot 2026-09-08 014435" src="https://github.com/user-attachments/assets/3cf4adec-4b96-40a8-ae4d-2cce221206dc" />


<img width="1345" height="649" alt="Screenshot 2026-09-08 014522" src="https://github.com/user-attachments/assets/6bd8fe02-3def-41d2-bef5-
d269477537a3" />


<img width="1335" height="622" alt="Screenshot 2026-09-08 014548" src="https://github.com/user-attachments/assets/4f4eb319-1949-410b-8013-e47328cb6a20" />


<img width="720" height="542" alt="Screenshot 2026-09-08 014649" src="https://github.com/user-attachments/assets/166f7e90-7168-4035-8e19-c1186d574632" />

