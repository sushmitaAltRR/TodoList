import React from 'react';
import { toast } from 'react-toastify'; // Importing toast here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

function Todo({
  list, // Now using the list passed from the parent
  setList,
  addList,
  deleteItem, // Parent function for deleting a task
  startEdit,
  editIndex,
  editText,
  setEditText,
  saveEdit,
  addText,
  setAddText, // State for add task text box
}) {
  const navigate = useNavigate(); // Initialize navigate for routing

  // Function to handle clicking on a task to view its details
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`); // Redirect to the task detail page using task ID
  };

  // Function to handle clicking the Add Task button
  const handleAddClick = () => {
    if (addText.trim() === '') {
      // Show a toast notification when the input is empty
      toast.error('Task box is empty! Please enter a task.');
    } else {
      addList(addText);
      setAddText(''); // Clear input after adding task
      toast.success('Task added successfully!');
    }
  };

  // Function to handle deleting a task
  const handleDelete = (index) => {
    deleteItem(index); // Call the deleteItem passed from App (this will handle toast)
  };

 // Function to handle the Enter key (both for Add and Edit)
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default behavior
    if (editIndex === null) {
      // Add task mode
      if (addText.trim() === '') {
        // Show error if the Add Task input is empty
        toast.error('Task box is empty! Please enter a task.');
      } else {
        handleAddClick();
      }
    } else {
      // Edit task mode
      if (editText.trim() === '') {
        // Show error if the Edit Task input is empty
        toast.error('Task box is empty! Please enter a task.');
      } else {
        saveEdit(); // Save the edited task if it's not empty
      }
    }
  }
};


  return (
    <div className="container mx-auto p-4">
      {/* Input Section for Adding Task */}
      <div className="mb-4 flex items-center">
        {/* Shortened text box */}
        <input
          type="text"
          className="p-2 w-4/5 border rounded-l-md"
          placeholder="Enter what to do"
          value={addText}
          onChange={(e) => setAddText(e.target.value)} // Update state as user types
          onKeyDown={handleKeyDown} // Handle Enter key press
          disabled={editIndex !== null} // Disable add task input when editing
        />
        
        {/* Button with increased height */}
        <button
          onClick={handleAddClick} // Handle the click event here
          className={`ml-0 p-3 bg-indigo-800 text-white ${addText.trim() === '' ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'} rounded-r-md`} 
          disabled={editIndex !== null} // Disable Add button when editing
        >
          +
        </button>
      </div>

      {/* Todo List Section with Scrollable List */}
      <ul className="max-h-64 overflow-y-auto space-y-4 p-4">  {/* Added space-y-4 for gap between tasks */}
        {list.map((item, index) => (
          <li key={item.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md w-full max-w-xl">
            {/* Editable task (when editing) */}
            {editIndex === index ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="p-2 w-full border rounded-md"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)} // Update task text while editing
                  onKeyDown={handleKeyDown} // Listen for the Enter key
                />
                <button
                  onClick={saveEdit}
                  className="ml-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <span className="flex-1 text-left truncate cursor-pointer" onClick={() => handleTaskClick(item.id)}>
                {item.title}
              </span> // Render task title and make it clickable
            )}

            {/* Hide buttons during editing */}
            {editIndex !== index && (
              <>
                <button
                  className="ml-2 hover:bg-red-800 p-2 rounded-full"
                  onClick={() => handleDelete(index)} // Delete task
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-600 hover:text-white" />
                </button>

                <button
                  onClick={() => startEdit(index)} // Start editing task
                  className="ml-2 p-2 rounded-full bg-transparent hover:bg-yellow-500 hover:bg-opacity-80"
                >
                  <FontAwesomeIcon icon={faEdit} className="text-gray-600 hover:text-white" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
