import React from 'react';
import useTodoStore from '../app/todoStore';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus);

  return (
    <div>
      {todos.length === 0 ? (
        <p style={{ color: '#ccc', fontStyle: 'italic' }}>No todos yet!</p>
      ) : (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="todo-item"
            style={{
              backgroundColor: todo.completed ? '#00ff0044' : '#2a2a2a',
              color: todo.completed ? '#555' : '#fff',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            <div className="todo-item-col-1">
              <input
                type="checkbox"
                id={`todo-checkbox-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
                aria-label={`Mark todo '${todo.title}' as completed`}
              />
              <label htmlFor={`todo-checkbox-${todo.id}`} style={{ marginLeft: '8px' }}>
                {todo.title}
              </label>
            </div>

            <div style={{ flexGrow: 1, marginLeft: '1rem' }}>
              {todo.description && <p style={{ margin: 0 }}>{todo.description}</p>}
              {todo.dueDate && (
                <small style={{ color: '#aaa' }}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </small>
              )}
              {todo.priority && (
                <small
                  style={{
                    color:
                      todo.priority === 'High'
                        ? '#ff6666'
                        : todo.priority === 'Medium'
                        ? '#ffd966'
                        : '#66ff66',
                    fontWeight: 'bold',
                    marginLeft: '0.5rem',
                  }}
                >
                  [{todo.priority}]
                </small>
              )}
            </div>

            <button
              className="delete-btn"
              onClick={() => removeTodo(todo.id)}
              aria-label={`Delete todo '${todo.title}'`}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </div>
  );
};

export default TodoList;
