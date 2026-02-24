import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useStudents } from '../context/StudentContext';

const Students = () => {
  const { bg, card, text, textMuted, primary, success, danger, warning } = useTheme();
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    semester: 1,
    marks: 0,
    attendance: 0,
    status: 'Active'
  });

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData(student);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, formData);
    } else {
      addStudent(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      course: '',
      semester: 1,
      marks: 0,
      attendance: 0,
      status: 'Active'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: text, margin: 0 }}>Students Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: showForm ? '#6b7280' : primary,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{
            backgroundColor: card,
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: text, marginBottom: '15px' }}>
              {editingId ? 'Edit Student' : 'Add New Student'}
            </h4>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Course"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="Semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                  min="1"
                  max="8"
                  required
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Marks %"
                  value={formData.marks}
                  onChange={(e) => setFormData({...formData, marks: parseInt(e.target.value)})}
                  min="0"
                  max="100"
                  required
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <input
                  type="number"
                  placeholder="Attendance %"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
                  min="0"
                  max="100"
                  required
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Warning">Pending</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: success,
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Students Table */}
        <div style={{ backgroundColor: card, borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: bg }}>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Course</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Sem</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Marks</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Attend</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: text }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderTop: `1px solid ${textMuted}` }}>
                  <td style={{ padding: '12px', color: text }}>{s.name}</td>
                  <td style={{ padding: '12px', color: text }}>{s.course}</td>
                  <td style={{ padding: '12px', color: text }}>{s.semester}</td>
                  <td style={{ padding: '12px', color: text }}>{s.marks}%</td>
                  <td style={{ padding: '12px', color: text }}>{s.attendance}%</td>
                  <td style={{ padding: '12px', color: s.status === 'Active' ? success : danger }}>
                    {s.status}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleEdit(s)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: warning,
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '5px',
                        fontSize: '12px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(s.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: danger,
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;