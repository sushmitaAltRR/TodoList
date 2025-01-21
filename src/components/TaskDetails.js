import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the task ID

function TaskDetails() {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        setTask(data); 
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]); // Re-fetch task when the `id` changes

  if (!task) return <div>Loading...</div>; // Show loading state while fetching task

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center mb-4">Task Details</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>User ID:</strong> {task.userId}</p>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default TaskDetails;
