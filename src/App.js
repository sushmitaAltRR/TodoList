
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './TodoApp'; // Main page where tasks are listed
import TaskDetail from './components/TaskDetails'; // New page for task details

function App() {
  return (
    <Router>
      <Routes>
        {/* Main page where tasks are listed */}
        <Route path="/" element={<TodoApp />} />
        
        {/* Task details page */}
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </Router>


  );
}

export default App;

