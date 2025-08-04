import React, { useState, useEffect } from 'react';
import './App.css';
import useTodoStore from './app/todoStore';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const todos = useTodoStore((state) => state.todos);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleForm = () => setShowForm((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="main-container">
      <h1 className="heading">To-Do List Efficient</h1>

      <section className="sub-container">
        
        <h1 className="plush" title="Add todo" onClick={toggleForm}>
          +
        </h1>

        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark/light mode"
          style={{
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            backgroundColor: darkMode ? '#00fff7' : '#222',
            color: darkMode ? '#121212' : '#00fff7',
            boxShadow: darkMode
              ? '0 4px 12px rgba(0, 255, 255, 0.5)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            userSelect: 'none',
          }}
          type="button"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </section>

      {showForm && <TodoForm onClose={() => setShowForm(false)} />}

      {todos.length > 0 && <TodoList todos={todos} />}
    </div>
  );
}

export default App;
