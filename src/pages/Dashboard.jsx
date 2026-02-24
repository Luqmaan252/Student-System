import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useStudents } from '../context/StudentContext';

const Dashboard = ({ user }) => {
  const { bg, card, text, textMuted, primary, success } = useTheme();
  const { students, getStats } = useStudents();
  const stats = getStats();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: text, marginBottom: '20px' }}>
          {user?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
        </h2>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div style={{ backgroundColor: card, padding: '20px', borderRadius: '10px' }}>
            <p style={{ color: textMuted, margin: '0 0 5px 0' }}>Total Students</p>
            <h2 style={{ color: primary, margin: 0 }}>{stats.total}</h2>
          </div>
          <div style={{ backgroundColor: card, padding: '20px', borderRadius: '10px' }}>
            <p style={{ color: textMuted, margin: '0 0 5px 0' }}>Active Students</p>
            <h2 style={{ color: success, margin: 0 }}>{stats.active}</h2>
          </div>
          <div style={{ backgroundColor: card, padding: '20px', borderRadius: '10px' }}>
            <p style={{ color: textMuted, margin: '0 0 5px 0' }}>Pending Studens</p>
            <h2 style={{ color: '#f59e0b', margin: 0 }}>{stats.avgMarks}%</h2>
          </div>
      
        </div>

        {/* Recent Students */}
        <div style={{ backgroundColor: card, padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: text, marginTop: 0, marginBottom: '15px' }}>Recent Students</h3>
          {students.slice(0, 3).map(s => (
            <div key={s.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: `1px solid ${textMuted}`
            }}>
              <span style={{ color: text }}>{s.name}</span>
              <span style={{ color: s.status === 'Active' ? success : '#ef4444' }}>
                {s.marks}% | {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;