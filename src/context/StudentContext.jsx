import React, { createContext, useState, useContext, useEffect } from 'react';

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // EMPTY array marka ugu horeysa
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('myStudents');
    console.log('Loading students from storage:', saved);
    return saved ? JSON.parse(saved) : []; 
  });

  //  SAVE to localStorage every time students change
  useEffect(() => {
    console.log('Saving students to storage:', students);
    localStorage.setItem('myStudents', JSON.stringify(students));
  }, [students]);

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
      getStats
    }}>
      {children}
    </StudentContext.Provider>
  );
};