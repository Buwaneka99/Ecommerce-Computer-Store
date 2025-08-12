# 🖥️ Ecommerce Computer Store

A modern, full-stack ecommerce platform for buying computers and accessories, developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This application provides secure user authentication, seamless order processing, service management, promotional campaigns, and staff coordination for efficient store operations.

---

## 🚀 Key Features

### 📦 Supply & Promotion Management
- Central dashboard for managing suppliers (company info, contract terms, and performance).
- Create and track **promotions** with:
  - Custom coupon codes
  - Validity durations
  - Eligibility rules
- Automatically pause promotions if related items go out of stock.
- Visual analytics to measure campaign performance.

### 🛒 Sales & Order Management
- Add items to cart and proceed to checkout with **Cash on Delivery** or **Card Payments**.
- Admin dashboard for:
  - Approving or rejecting orders
  - Updating order status (e.g., *Shipped*, *Delivered*)
  - Viewing full order history
- Real-time **inventory sync** to prevent overselling.
- Automated **customer notifications** and **PDF sales reports** (daily, weekly, monthly).

### 🧾 Inventory Management
- Full product catalog management:
  - Add, edit, delete, and search products
  - Support for pagination
- Export product lists as **PDF reports**.

### 🛠️ User Service Request Management
- Users can report issues with purchased products.
- Admins can:
  - Track and manage service requests
  - Export service records as PDFs for documentation

### 👨‍💼 Staff Management
- Add and update staff profiles and role assignments.
- Handle **salary tracking** and manage monthly payroll.
- Integrated **internal live chat system** for real-time communication among staff.

---

## 🛠️ Tech Stack

| Layer         | Technologies Used                                           |
|---------------|-------------------------------------------------------------|
| Frontend      | React.js, Tailwind CSS, Redux                               |
| Backend       | Node.js, Express.js                                         |
| Database      | MongoDB, Mongoose                                           |
| Auth & Security | JWT, Bcrypt                                                |
| Payments      | Stripe (or compatible integration)                          |
| Utilities     | Axios, PDF libraries (`pdfmake`, etc.)                      |

---

## ⚙️ Installation Guide

### 📁 Backend Setup
```bash
cd backend
npm install
# Create a `.env` file with the following:
# - MONGODB_URI
# - JWT_SECRET
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - STRIPE_SECRET (if applicable)
and add 
# - GOOGLE_CALLBACK_URL=/auth/google/callback
# - SESSION_SECRET=Skill_Shareing_Platform_Development
npm start
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```plaintext
/backend
├── Config          # DB & environment configs
├── Controllers     # Business logic
├── Middleware      # Authentication & validation
├── Models          # MongoDB schemas
├── Routes          # REST API endpoints
├── db              # DB connection files
└── server.js       # Application entry point

/frontend
├── public          # Static files (images, icons, etc.)
├── src
│   ├── components  # React components
│   ├── utils       # Utility functions
│   └── App.js      # Main app component
├── tailwind.config.js
└── package.json
```

---

## 👥 Contributors

| Contributors                                         | Responsibility                           |
|------------------------------------------------------|------------------------------------------|
| [Buwaneka99](https://github.com/Buwaneka99)          | Supply & Promotion Management            |
| [DilmiJ](https://github.com/DilmiJ)                  | Inventory Management, Service Requests   |
| [KalpaVidusha](https://github.com/KalpaVidusha)      | Sales & Order Management                 |
| [SanilkaSrimal](https://github.com/SanilkaSrimal)    | Staff Management, Live Chat              |
