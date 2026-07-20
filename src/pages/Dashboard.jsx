import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TodoItem from "../components/TodoItem";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const { user, logout } = useAuth();

  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await api.post("/todos", { text });
    setTodos([res.data, ...todos]);
    setText("");
  };

  const toggleTodo = async (todo) => {
    const res = await api.put(`/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };
  const updateTodo = async (id, updates) => {
    const res = await api.put(`/todos/${id}`, updates);
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Hi, {user?.username}</h1>
          <button onClick={logout} className="text-sm text-red-500">
            Log Out
          </button>
        </div>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
