import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import './App.css';

// Core User Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import UserProfile from "./Pages/UserProfile";
import OAuthSuccess from "./Pages/OAuthSuccess"; 

// Service (User & Admin)
//import UserService from "./Pages/servicem/Userservice"; // ✅ FIXED: matched filename
import UserService from './Pages/servicem/UserService';
import UserServicesList from "./Pages/servicem/UserServicesList"; // ✅ Confirmed correct
import DashboardService from "./Pages/servicem/DashboardService";
//import DashboardServiceList from "./Pages/servicem/DashboardServiceList";
import AllServicesAdmin from './Pages/servicem/AllServicesAdmin';

// Staff and Salary Management
import DashboardStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardStaff";
import DashboardAddStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardAddStaff";
import DashboardStaffList from "./Pages/StaffAndSalaryManagement/staff-management/DashboardStaffList";
import DashboardEditStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardEditStaff";
import DashboardSalary from "./Pages/StaffAndSalaryManagement/SalaryManagement/DashboardSalary";
import CalculateSalary from "./Pages/StaffAndSalaryManagement/SalaryManagement/CalculateSalary";
import SalaryPayments from "./Pages/StaffAndSalaryManagement/SalaryManagement/SalaryPayments";
import EditSalary from "./Pages/StaffAndSalaryManagement/SalaryManagement/EditSalary";
import Chat from "./Pages/StaffAndSalaryManagement/staff-management/Chat";
import Chatlogin from "./Pages/StaffAndSalaryManagement/staff-management/chatlogin";

// Supply and Promotion
import Supply from "./Pages/Supply and Promotion Management/Supply";
import AddSupplier from "./Pages/Supply and Promotion Management/AddSupplier";
import EditSupplier from "./Pages/Supply and Promotion Management/EditSupplier";
import SupplierList from "./Pages/Supply and Promotion Management/SupplierList";
import SupplierRequest from "./Pages/Supply and Promotion Management/SupplyRequests";
import PromotionManager from "./Pages/Supply and Promotion Management/Promotion/PromotionManager";
import PromotionItems from "./Pages/Supply and Promotion Management/Promotion/PromotionItems";
import AddCoupon from "./Pages/Supply and Promotion Management/Promotion/AddCoupon";
import CouponList from "./Pages/Supply and Promotion Management/Promotion/CouponList";
import EditCoupon from "./Pages/Supply and Promotion Management/Promotion/EditCoupon";

// Product Management
import Inventory from "./Pages/inventory/inventory/Inventory";
import AddProduct from "./Pages/inventory/inventory/AddProduct";
import ProductsList from "./Pages/inventory/inventory/ProductsList";
import EditProduct from "./Pages/inventory/inventory/EditProduct";
import ProductPage from "./Pages/ProductPage";

// Order and Sales Management
import Cart from "./Pages/OrderAndSalesManagement/Cart";
import UserOrders from "./Pages/OrderAndSalesManagement/UserOrders";
import SalesManager from "./Pages/OrderAndSalesManagement/SalesManager";
import SalesList from "./Pages/OrderAndSalesManagement/SalesList";
import DeliveryManager from "./Pages/OrderAndSalesManagement/DeliveryManager";
import OrderList from "./Pages/OrderAndSalesManagement/OrderList";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Service (User) */}
        <Route path="/user/service/previous-claims" element={<UserServicesList />} />
        <Route path="/user/service" element={<UserService />} />

        {/* Service (Admin / Manager) */}
        <Route path="/dashboard/service" element={<DashboardService />} />
        
<Route path="/dashboard/service/list" element={<AllServicesAdmin />} />  

       
        {/* Staff Management */}
        <Route path="/dashboard/staff" element={<DashboardStaff />} />
        <Route path="/dashboard/staff/add" element={<DashboardAddStaff />} />
        <Route path="/dashboard/staff/edit/:id" element={<DashboardEditStaff />} />
        <Route path="/dashboard/staff/list" element={<DashboardStaffList />} />
        <Route path="/chatlogin" element={<Chatlogin />} />
        <Route path="/chat" element={<Chat />} />

        {/* Salary Management */}
        <Route path="/dashboard/salary" element={<DashboardSalary />} />
        <Route path="/dashboard/salary/add" element={<CalculateSalary />} />
        <Route path="/dashboard/salary/list" element={<SalaryPayments />} />
        <Route path="/dashboard/salary/edit/:id" element={<EditSalary />} />

        {/* Supply Management */}
        <Route path="/dashboard/supply" element={<Supply />} />
        <Route path="/dashboard/supply/add" element={<AddSupplier />} />
        <Route path="/dashboard/supply/edit/:id" element={<EditSupplier />} />
        <Route path="/dashboard/supply/list" element={<SupplierList />} />
        <Route path="/dashboard/supply/request-list" element={<SupplierRequest />} />

        {/* Promotion Management */}
        <Route path="/dashboard/promotion" element={<PromotionManager />} />
        <Route path="/dashboard/promotion/items" element={<PromotionItems />} />
        <Route path="/dashboard/promotion/coupon/add" element={<AddCoupon />} />
        <Route path="/dashboard/promotion/coupon/list" element={<CouponList />} />
        <Route path="/dashboard/promotion/coupon/edit/:id" element={<EditCoupon />} />

        {/* Product Management */}
        <Route path="/dashboard/products" element={<Inventory />} />
        <Route path="/dashboard/products/add" element={<AddProduct />} />
        <Route path="/dashboard/products/list" element={<ProductsList />} />
        <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Orders and Sales */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/dashboard/sales" element={<SalesManager />} />
        <Route path="/dashboard/sales/list" element={<SalesList />} />
        <Route path="/dashboard/delivery" element={<DeliveryManager />} />
        <Route path="/dashboard/order/list" element={<OrderList />} />

        {/* Catch-All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
