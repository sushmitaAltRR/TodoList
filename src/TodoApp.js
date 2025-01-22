import React, { useState, useEffect } from 'react';
import Todo from './components/todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function TodoApp() {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [addText, setAddText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos'
        );
        const data = await response.json();
        setList(data.slice(0, 10));
      } catch (error) {
        toast.error('Error fetching tasks from the server');
      }
    };
    fetchTasks();
  }, []);

  const addList = (inputText) => {
    if (inputText !== '') {
      setList([...list, { title: inputText, id: Date.now() }]);
    }
  };

  const deleteItem = (key) => {
    const deletedTask = list[key].title;
    const newListTodo = [...list];
    newListTodo.splice(key, 1);
    setList(newListTodo);
    toast.success(`Task "${deletedTask}" has been deleted.`);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(list[index].title);
  };

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
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
      <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
        <hr className="mb-4" />

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
          setAddText={setAddText}
          handleTaskClick={handleTaskClick}
        />
      </div>

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





