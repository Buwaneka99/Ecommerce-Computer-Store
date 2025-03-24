import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing the main components
//import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Route path="/login" element={Login} />
    /</Router>
  );
}

export default App;
