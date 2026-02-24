import React, { createContext, useState, useContext, useEffect } from 'react';

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [

    ];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // CRUD
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: `S${String(students.length + 1).padStart(3, '0')}`
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteStudent = (id) => {
    if (window.confirm('Ma hubtaa inaad tirtireysid?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const getStudent = (id) => students.find(s => s.id === id);

  const getStats = () => ({
    total: students.length,
    active: students.filter(s => s.status === 'Active').length,
    avgMarks: (students.reduce((sum, s) => sum + s.marks, 0) / students.length || 0).toFixed(1)
  });

  return (
    <StudentContext.Provider value={{
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      getStudent,
      getStats
    }}>
      {children}
    </StudentContext.Provider>
  );
};