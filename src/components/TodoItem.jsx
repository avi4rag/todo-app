import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return; 
    if (trimmed !== todo.text) {
      onUpdate(todo._id, { text: trimmed });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text); 
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <li className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          disabled={isEditing}
          className="h-5 w-5 shrink-0 accent-blue-600 cursor-pointer disabled:opacity-40"
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 min-w-0 border border-blue-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <span
            className={`flex-1 min-w-0 truncate text-sm transition-colors ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-2.5 py-1 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md px-2.5 py-1 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 text-xs font-medium text-blue-600 hover:text-blue-800 transition-opacity px-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="opacity-0 group-hover:opacity-100 text-xs font-medium text-red-500 hover:text-red-700 transition-opacity px-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
