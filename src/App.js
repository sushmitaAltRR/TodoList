import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDetails from './components/TaskDetails'; 
import TodoApp from './components/todo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
        <div className="max-w-lg w-full p-6 rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<TodoApp />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </Router>
  );
}

export default App;
