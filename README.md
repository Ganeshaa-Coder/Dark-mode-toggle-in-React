# Dark-mode-toggle-in-React
import React, { useEffect, useState } from 'react';
import './App.css'; // Add your styles here

function App() {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app">
      <h1>Dark Mode Toggle</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default App;
