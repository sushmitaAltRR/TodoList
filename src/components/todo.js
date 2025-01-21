import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function TodoApp() {
  const [inputText, setInputText] = useState('');
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setList(data.slice(0, 10)); // Get the first 10 tasks
      } catch (error) {
        toast.error("Error fetching tasks from the server");
      }
    };
    fetchTasks();
  }, []);

  // Add new task to list
  const addList = (inputText) => {
    if (inputText !== '') {
      setList([...list, { title: inputText, id: Date.now() }]);
      toast.success("Task added successfully!");
    }
  };

  // Handle Enter key press to add task
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && inputText.trim() !== '') {
      addList(inputText);
      setInputText('');
    }
  };

  // Handle button click to add task
  const handleAddClick = () => {
    if (inputText.trim() === '') {
      toast.error("Task box is empty! Please enter a task.");
    } else {
      addList(inputText);
      setInputText('');
    }
  };

  // Start editing a task
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(list[index].title);
  };

  // Save edited task
  const saveEdit = () => {
    if (editText.trim()) {
      const updatedList = list.map((item, i) =>
        i === editIndex ? { ...item, title: editText } : item
      );
      setList(updatedList);
      setEditIndex(null);
      setEditText('');
      toast.success("Task has been edited successfully!");
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  // Delete task from list
  const deleteItem = (index) => {
    const newListTodo = [...list];
    newListTodo.splice(index, 1);
    setList(newListTodo);
    toast.success("Task successfully deleted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
      <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
        {/* Input to add a new task */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            className="p-2 w-4/5 border rounded-l-md"
            placeholder="Enter what to do"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button
            onClick={handleAddClick}
            className={`ml-0 p-3 bg-indigo-800 text-white ${inputText.trim() === '' ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'} rounded-r-md`}
          >
            +
          </button>
        </div>

        <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
        <hr className="mb-4" />

        {/* List of tasks */}
        <ul className="space-y-2 overflow-y-auto max-h-80 pr-4">
          {list.map((listItem, i) => (
            <li key={listItem.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
              {/* Editable task (when editing) */}
              {editIndex === i ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    className="p-2 w-full border rounded-md"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)} // Update task text while editing
                  />
                  <button
                    onClick={saveEdit}
                    className="ml-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // Make task name clickable and redirect to another page for task details
                <Link to={`/task/${listItem.id}`} className="flex-1 text-left truncate">
                  {listItem.title}
                </Link>
              )}

              {/* Delete button with hover effect */}
              <button
                className="ml-2 hover:bg-red-800 p-2 rounded-full"
                onClick={() => deleteItem(i)} // Delete task
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-600 hover:text-white" />
              </button>

              {/* Edit button with hover effect */}
              <button
                onClick={() => startEdit(i)} // Start editing task
                disabled={editIndex === i} // Disable button if task is being edited
                className={`ml-2 p-2 rounded-full ${editIndex === i ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-transparent hover:bg-yellow-500 hover:bg-opacity-80'}`}
              >
                <FontAwesomeIcon icon={faEdit} className="text-gray-600 hover:text-white" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
