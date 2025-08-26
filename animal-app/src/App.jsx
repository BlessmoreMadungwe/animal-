import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Index from './pages/Index';
import AddAnimal from './pages/AddAnimal';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav className="p-4 bg-blue-500 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/add-animal">Add Animal</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/add-animal" element={user ? <AddAnimal user={user} /> : <Login setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
        <Route path="/index" element={<Index user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
