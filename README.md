# 🧾 Order Management System (OMS)

A fully functional React-based Order Management System with modular SKU and Order handling. Built for performance, UX, and scalability.

---

## 🚀 Features

### 🏷️ SKU Management

- Add, edit, delete SKUs
- Fields: `name`, `code`, `price`, `active/inactive` toggle
- Paginated and searchable list
- Custom searchable dropdown with infinite scroll (Active SKUs only)

### 📦 Order Creation

- Customer form with validation: name, email, phone, address
- Add multiple order items with SKU selection
- Live total calculation and inline field validation
- Only active SKUs allowed for selection

### 📊 Order Management

- Tab-based filtering: New, Delivered, Cancelled, All
- Search by customer name or order ID
- Sort by created date (ASC/DESC)
- Bulk status updates with confirmation modal
- Pagination (10 per page)

---

## 🧩 Tech Stack

- **React** (functional components & hooks)
- **Context API** for global toast
- **Tailwind CSS** for styling
- **json-server** for mocked APIs
- **Custom Components**: `StatusToggle`,`Header`, `SKUSelect`, `ConfirmModal`, `Toast`, `Button`, `Pagination`

---

## 📁 Folder Structure

```
components/  
  ├─StatusTogle
    ├─Toggle.jsx
  ├─ Button.jsx
  ├─ ConfirmModal.jsx
  ├─ SKUSelect.jsx
  ├─ Pagination.jsx
  ├─ Header.jsx
context/
  ├─ ToastContext.jsx
pages/
  ├─ OrdersPage.jsx
  ├─ SKUs.jsx
  ├─ CreateOrderPage.jsx
```

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/yourname/oms-react.git
cd oms-react

# 2. Install dependencies
npm install
npm install json-server

# 3. Start json-server (for mock API)
node server.cjs

# 4. Run the React app
npm run dev
```

---

## 📹 Demo

**Live Link**: [Deployed App](https://your-oms-link.vercel.app)

**Video Walkthrough**: [Watch Demo](https://your-demo-video-link)

---

## 💡 Highlights

- No external UI libraries for dropdown — fully custom
- Clean UX with toast feedback and modals
- Reusable components for scalability
- All requirements fulfilled + bonus features ✅
