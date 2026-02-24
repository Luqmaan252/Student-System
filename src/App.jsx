import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <StudentProvider>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/dashboard" element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/students" element={
              user ? <Students /> : <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StudentProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;