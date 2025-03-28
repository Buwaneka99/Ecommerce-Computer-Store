import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import './App.css';


import Inventory from "./pages/inventory/inventory/Inventory";
import AddProduct from "./pages/inventory/inventory/AddProduct";
import ProductsList from "./pages/inventory/inventory/ProductsList";
import EditProduct from "./pages/inventory/inventory/EditProduct";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />


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


        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
        

      </Routes>
    </Router>
  );
}

export default App;
