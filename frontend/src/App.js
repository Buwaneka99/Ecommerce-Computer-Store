import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import './App.css';

// Supply Management
import Supply from "./Pages/Supply and Promotion Management/Supply";
import AddSupplier from "./Pages/Supply and Promotion Management/AddSupplier";
import EditSupplier from "./Pages/Supply and Promotion Management/EditSupplier";
import SupplierList from "./Pages/Supply and Promotion Management/SupplierList";
import SupplierRequest from "./Pages/Supply and Promotion Management/SupplyRequests";

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

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;
