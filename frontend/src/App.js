import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
//import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import './App.css';


function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
