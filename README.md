```markdown
# Ecommerce Computer Store 🖥️  
A modern, full-stack web application for purchasing computers and accessories, built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Features secure authentication, order management, service requests, promotions, and staff management tools for seamless online store operations.

---

## Key Components ✨  

| Component Name                  | Contributor ID |
|----------------------------------|----------------|
| Sales & Order Management         | IT22237972     |
| Supply & Promotion Management    | IT22109194     |
| Inventory Management             | IT22097460     |
| User Service Request Management  | IT22097460     |
| Staff Management                 | IT22223180     |

---

## Component Descriptions ✨  

### 1. **Sales & Order Management**  
- User cart system with checkout (cash on delivery or card payment).  
- Sales dashboard to approve/reject orders, update statuses (e.g., "Shipped"), and view purchase histories.  
- Auto-sync with inventory to prevent overselling.  
- PDF sales reports (daily/weekly/monthly) and automated customer notifications.  

### 2. **Supply & Promotion Management**  
- Centralized supplier management (company details, contracts, performance tracking).  
- Promotions with custom coupon codes, validity periods, and eligibility rules.  
- Real-time dashboard for tracking promo impact and auto-pausing promotions for out-of-stock items.  

### 3. **Inventory Management**  
- Add/update/delete products with search and pagination.  
- PDF report generation for product listings.  

### 4. **User Service Request Management**  
- Submit and track service issues for purchased products.  
- Admin management of service requests with PDF record generation.  

### 5. **Staff Management**  
- Add/update staff profiles and roles.  
- Salary management with payroll tracking.  
- Internal live chat for real-time team collaboration.  

---

## Tech Stack 🛠️  
- **Frontend**: React.js, Tailwind CSS, Redux (state management)  
- **Backend**: Node.js, Express.js, MongoDB (database)  
- **Authentication**: JWT, Bcrypt  
- **Payment Integration**: Stripe (or similar)  
- **Additional Tools**: PDF generation libraries (e.g., `pdfmake`), Axios, Mongoose  

---

## Installation ⚙️  
1. Clone the repository:  
   ```bash 
   git clone [repository-url] 
   ```  
2. **Backend Setup**:  
   ```bash 
   cd backend 
   npm install 
   # Create a `.env` file with MongoDB URI, JWT secret, etc. 
   npm start 
   ```  
3. **Frontend Setup**:  
   ```bash 
   cd frontend 
   npm install 
   npm run dev 
   ```  

---

## File Structure 📂  
```plaintext
/backend  
├── Config          # DB configuration  
├── Controllers     # Logic for routes  
├── Middleware      # Auth & validation  
├── Models          # MongoDB schemas  
├── Routes          # API endpoints  
├── db              # Database connection  
└── server.js       # Entry point  

/frontend  
├── public          # Static assets  
├── src  
│   ├── components  # React components  
│   ├── utils       # Helper functions  
│   └── App.js      # Main frontend entry  
├── tailwind.config.js  
└── package.json  
```

---

## Contributors 👥  
- **IT22109194**: Supply & Promotion Management  
- **IT22097460**: Inventory Management & Service Requests  
- **IT22237972**: Sales & Order Management  
- **IT22223180**: Staff Management & Live Chat  

---

## License 📄  
MIT License. See `LICENSE` for details.  
``` 

This version:  
- Removes contributor IDs from component descriptions (mapped in the table instead).  
- Uses a table to link component names with contributor IDs.  
- Retains all features, installation steps, and project structure details.  
- Follows GitHub-flavored Markdown syntax.
