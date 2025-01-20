// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// function ListTodo(props) {
//   return (
//     <ul>
//       <li className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
//         <span className="flex-1 text-left truncate">{props.item}</span>

//         <button
//           className="ml-2 hover:bg-red-800 p-2 rounded-full"
//           onClick={() => props.deleteItems(props.index)}
//         >
//           <FontAwesomeIcon icon={faTrash} className="text-red-600 hover:text-white" />
//         </button>

//         <button
//           className="ml-2 hover:bg-yellow-500 p-2 rounded-full"
//           onClick={() => props.startEdit(props.index)}
//         >
//           <FontAwesomeIcon icon={faEdit} className="text-gray-700 hover:text-white" />
//         </button>
//       </li>
//     </ul>
//   );
// }

// export default ListTodo;



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListTodo({
  index,
  item,
  deleteItems,
  startEdit,
  editIndex,
  editText,
  setEditText,
  saveEdit,
}) {

  // Handle the Enter key to save the edited task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent form submission or default behavior
      saveEdit();          // Call the save edit function
    }
  };

  return (
    <ul>
      <li className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md w-full max-w-xl">
        {/* Editable task (when editing) */}
        {editIndex === index ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              className="p-2 w-full border rounded-md"
              value={editText}
              onChange={(e) => setEditText(e.target.value)} // Update task text while editing
              onKeyDown={handleKeyDown}  // Listen for the Enter key
            />
            <button
              onClick={saveEdit}
              className="ml-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <span className="flex-1 text-left truncate">{item}</span>
        )}

        {/* Delete button with hover effect */}
        <button
          className="ml-2 hover:bg-red-800 p-2 rounded-full"
          onClick={() => deleteItems(index)} // Delete task
        >
          <FontAwesomeIcon icon={faTrash} className="text-red-600 hover:text-white" />
        </button>

        {/* Edit button with hover effect */}
        <button
          onClick={() => startEdit(index)} // Start editing task
          disabled={editIndex === index} // Disable button if task is being edited
          className={`ml-2 p-2 rounded-full 
            ${editIndex === index
              ? 'bg-gray-400 cursor-not-allowed opacity-50' // Disabled state styles
              : 'bg-transparent hover:bg-yellow-500 hover:bg-opacity-80' // Normal state with hover effect
            }`}
        >
          <FontAwesomeIcon icon={faEdit} className="text-gray-600 hover:text-white" />
        </button>
      </li>
    </ul>
  );
}

export default ListTodo;
