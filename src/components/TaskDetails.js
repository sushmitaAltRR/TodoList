//this is 
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };
    fetchTaskDetails();
  }, [id]);

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div className="min-h-screen bg-indigo-300 flex flex-col">
      {/* Navbar Section */}
      <div className="bg-indigo-800 p-4">
        <Link to="/" className="text-white text-sm font-medium hover:underline">
          Back to Task List
        </Link>
      </div>

      {/* Task Detail Section */}
      <div className="flex flex-1 items-center justify-center p-5">
        <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center mb-4">Task Detail</h1>
          <div>
            <h2 className="text-xl">Title: {task.title}</h2>
            <p>
              <strong>ID:</strong> {task.id}
            </p>
            <p>
              <strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
