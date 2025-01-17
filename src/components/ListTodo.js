import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListTodo(props) {
  return (
    <ul>
      <li className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
        {/* Task text */}
        <span className="flex-1 text-left truncate">{props.item}</span>

        {/* Delete button with hover effect */}
        <button
          className="ml-2 hover:bg-red-800 p-2 rounded-full"
          onClick={() => props.deleteItems(props.index)} // Delete task
        >
          <FontAwesomeIcon icon={faTrash} className="text-red-600 hover:text-white" />
        </button>

        {/* Edit button with hover effect */}
        <button
          className="ml-2 hover:bg-yellow-500 p-2 rounded-full"
          onClick={() => props.startEdit(props.index)} // Start editing task
        >
          <FontAwesomeIcon icon={faEdit} className="text-gray-700 hover:text-white" />
        </button>
      </li>
    </ul>
  );
}

export default ListTodo;
