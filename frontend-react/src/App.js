import logo from './logo.svg';
import './App.css';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
       <Route exact path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
       </Routes>
     </Router>
    </div>
  );
}

export default App;
