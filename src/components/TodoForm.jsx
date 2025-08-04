import React, { useState } from 'react';
import useTodoStore from '../app/todoStore';

const TodoForm = ({ onClose }) => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    addTodo({
      id: Math.ceil(Math.random() * 1000000),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      completed: false,
    });

    // Clear form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');

    if (onClose) onClose();
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="title">
          Title<span className="required">*</span>
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          className="form-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button className="form-submit-btn" onClick={handleSubmit}>
        Add Todo
      </button>

      <button
        className="delete-btn"
        onClick={onClose}
        style={{ marginTop: '0.5rem' }}
      >
        Cancel
      </button>
    </div>
  );
};

export default TodoForm;
