import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware'

const todoStore = (set) => ({
    todos: [],
    addTodo: (todo) => {
        set((state) => ({
            todos: [todo, ...state.todos],
        }))
    },
    removeTodo: (todoId) => {
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== todoId)
        }))
    },
    toggleTodoStatus: (todoId) => {
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo)
        }))
    }
})

const useTodoStore = create(
    devtools(
        persist(todoStore, {
            name: "todos",
        })
    )
)
export default useTodoStore;