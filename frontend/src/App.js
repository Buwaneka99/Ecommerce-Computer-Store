import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
