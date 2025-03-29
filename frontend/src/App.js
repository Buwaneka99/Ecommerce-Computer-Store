import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import './App.css';

// User
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import UserProfile from "./Pages/UserProfile";

// Staff and Salary Management
import DashboardStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardStaff";
import DashboardAddStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardAddStaff";
import DashboardStaffList from "./Pages/StaffAndSalaryManagement/staff-management/DashboardStaffList";
import DashboardEditStaff from "./Pages/StaffAndSalaryManagement/staff-management/DashboardEditStaff";



// Supply Management
import Supply from "./Pages/Supply and Promotion Management/Supply";
import AddSupplier from "./Pages/Supply and Promotion Management/AddSupplier";
import EditSupplier from "./Pages/Supply and Promotion Management/EditSupplier";
import SupplierList from "./Pages/Supply and Promotion Management/SupplierList";
import SupplierRequest from "./Pages/Supply and Promotion Management/SupplyRequests";

// Product Management
import Inventory from "./Pages/inventory/inventory/Inventory";
import AddProduct from "./Pages/inventory/inventory/AddProduct";
import ProductsList from "./Pages/inventory/inventory/ProductsList";
import EditProduct from "./Pages/inventory/inventory/EditProduct";
import ProductPage from "./Pages/ProductPage";


function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />

        {/* Staff and Salary Management */}
        <Route path="/dashboard/staff" element={<DashboardStaff />} />
        <Route path="/dashboard/staff/add" element={<DashboardAddStaff />} />
        <Route
          path="/dashboard/staff/edit/:id"
          element={<DashboardEditStaff />}
        />
        <Route path="/dashboard/staff/list" element={<DashboardStaffList />} />
        

        {/* Supply Management Routes */}
        <Route path="/dashboard/supply" element={<Supply />} />
        <Route path="/dashboard/supply/add" element={<AddSupplier />} />
        <Route path="/dashboard/supply/edit/:id" element={<EditSupplier />} />
        <Route path="/dashboard/supply/list" element={<SupplierList />} />
        <Route path="/dashboard/supply/request-list" element={<SupplierRequest />} />

        {/* Product management */}
        <Route path="/dashboard/products" element={<Inventory />} />
        <Route path="/dashboard/products/add" element={<AddProduct />} />
        <Route path="/dashboard/products/list" element={<ProductsList />} />
        <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
        


        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />


      </Routes>
    </Router>
  );
}

export default App;
