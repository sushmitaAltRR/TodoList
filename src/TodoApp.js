import React, { useState, useEffect } from 'react';
import Todo from './components/todo'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function TodoApp() {
  const [list, setList] = useState([]); // Store tasks
  const [editIndex, setEditIndex] = useState(null); // Track the task being edited
  const [editText, setEditText] = useState(''); // Text for the task being edited
  const [addText, setAddText] = useState(''); // Text for the Add Task input
  const navigate = useNavigate();

  // Fetch tasks from an API (example: jsonplaceholder)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setList(data.slice(0, 10)); // Fetch and store the first 10 tasks
      } catch (error) {
        toast.error('Error fetching tasks from the server');
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addList = (inputText) => {
    if (inputText !== '') {
      setList([...list, { title: inputText, id: Date.now() }]);
    }
  };

  // Delete a task
  const deleteItem = (key) => {
    const deletedTask = list[key].title;
    const newListTodo = [...list];
    newListTodo.splice(key, 1);
    setList(newListTodo);
    toast.success(`Task "${deletedTask}" has been deleted.`);
  };

  // Start editing a task
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(list[index].title);
  };

  // Save the edited task
  const saveEdit = () => {
    if (editText.trim()) {
      const updatedList = list.map((item, i) =>
        i === editIndex ? { ...item, title: editText } : item
      );
      setList(updatedList);
      setEditIndex(null);
      setEditText('');
      toast.success('Task has been edited successfully!');
    } else {
      toast.error('Task is empty! Please enter a valid task.');
    }
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`); // Navigate to the task details page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
      <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
        <hr className="mb-4" />

        {/* Pass the necessary functions and state to the Todo component */}
        <Todo
          list={list}
          setList={setList}
          addList={addList}
          deleteItem={deleteItem}
          startEdit={startEdit}
          editIndex={editIndex}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
          addText={addText}
          setAddText={setAddText} // Pass addText and setAddText
          handleTaskClick={handleTaskClick}
        />
      </div>

      {/* ToastContainer for showing toasts */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default TodoApp;

