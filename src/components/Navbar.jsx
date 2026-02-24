import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ user, setUser }) => {
  const { isDark, toggleTheme, card, text, primary } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: card,
      padding: '12px 20px',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h3 style={{ color: text, margin: 0 }}>📚 Student System</h3>
        {user && (
          <>
            <Link to="/dashboard" style={{ color: text, textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/students" style={{ color: text, textDecoration: 'none' }}>Students</Link>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user && (
          <span style={{ color: primary, fontWeight: 'bold' }}>
            👤 {user.name}
          </span>
        )}
        <button
          onClick={toggleTheme}
          style={{
            padding: '5px 10px',
            background: 'none',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            color: text
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              padding: '5px 12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;