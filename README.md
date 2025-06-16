# 🧾 Order Management System (OMS)

A fully functional React-based Order Management System with modular SKU and Order handling. Built for performance, UX, and scalability.

---

## 🚀 Tech Stack

- **Frontend**: React (Functional Components + Hooks)
- **Styling**: Tailwind CSS
- **State Management**: Local State + Context API
- **Form Handling**: Custom validation
- **Backend**: JSON Server (mock API)
- **Deployment**: Frontend (Vercel), Backend (Render)

---

## 📦 Features

### 1. SKU Management

- Add, Edit, Delete SKUs
- Each SKU includes:
  - Name
  - Code
  - Price
  - Active/Inactive status
- Filter SKUs by status (All / Active / Inactive)
- Search SKUs by name/code
- Paginated listing (10 SKUs per page)

### 2. Order Creation

- Customer details:
  - Full Name, Email, Phone
  - Address, City, Country
- Add order items dynamically from SKU list
- SKU select dropdown supports:
  - Search
  - Infinite scroll with API pagination
  - Only active SKUs listed
- Quantity input with validation
- Dynamic subtotal and total amount
- Form validation with inline errors
- Submit order as "New"
- Custom async searchable SKU dropdown

### 3. Order Management

- Filter orders by status: All / New / Delivered / Cancelled
- Search orders by ID or Customer Name
- Sort orders by Created Date (ASC/DESC)
- Pagination (10 per page)
- Bulk status update (with confirmation modal)
- Single order status update
- Toast for action feedback

---

## 💪 Bonus (Optional) — Implemented

- ✅ **Active / Inactive SKU functionality**

  - Users can toggle SKUs between Active and Inactive
  - Only **Active SKUs** are shown in the order creation dropdown

- ✅ **Live Deployment**
  - Frontend hosted on **Vercel**
  - Backend (JSON Server) hosted on **Render**
  - `.env` supports switching between local and production URLs

---

## 🔧 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/atul7800/OrderMan.git
cd oms

# 2. Install dependencies
npm install
npm install json-server

# 3. Create a .env file in root directory
VITE_API_URL=http://localhost:3000

# 4. Start json-server (for mock API)
node server.cjs

# 5. Run the React app
npm run dev
```

---

## ✨ Extra Enhancements (Beyond Given Requirements)

> The following features were implemented additionally to improve usability and quality:

### ✅ SKU Management

- Form validation for SKU Name, Code, Price
- Live error on exceeding 10 characters in SKU Code field
- Prevent typing more than 10 characters in SKU code field
- Real-time error messages under each field
- Newly added SKUs appear at the top instantly

### ✅ Order Creation

- Only active SKUs selectable in dropdown
- Inline errors per SKU row (e.g., skuId_0)
- Phone number field:
  - Accepts only digits
  - Max 10 digits
  - Prevents typing non-numeric characters

### ✅ UI/UX & Reusability

- Sticky header with shadow on scroll
- Header width aligned to main content
- Reusable modal component
- Overall consistent UI styling and behavior

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Button.jsx
│   ├── Header.jsx
|   ├── ConfirmModal.jsx
│   ├── Pagination.jsx
│   ├── SKUSelect.jsx
│   └── StatusToggle/
│       └── Toggle.jsx
├── context/
│   └── ToastContext.jsx
├── pages/
│   ├── SKUs.jsx
│   ├── OrdersPage.jsx
│   └── CreateOrderPage.jsx
├── App.jsx
├── main.jsx
├── App.css
|── index.css
├── index.html
└── server.cjs
```

---

## 📤 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**

---

## 📹 Demo

**Live Link**: [Deployed App](https://order-man-flax.vercel.app/)

## 🙌 Author

Built with ❤️ by Atul Gupta
