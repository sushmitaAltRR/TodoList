
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './TodoApp';
import TaskDetail from './components/TaskDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />} />

        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </Router>


  );
}

export default App;
