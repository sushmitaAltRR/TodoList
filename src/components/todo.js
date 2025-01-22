import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Todo({
  list,
  setList,
  addList,
  deleteItem,
  startEdit,
  editIndex,
  editText,
  setEditText,
  saveEdit,
  addText,
  setAddText,
}) {
  const navigate = useNavigate();
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleAddClick = () => {
    if (addText.trim() === '') {
      toast.error('Task box is empty! Please enter a task.');
    } else {
      addList(addText);
      setAddText('');
      toast.success('Task added successfully!');
    }
  };

  const handleDelete = (index) => {
    deleteItem(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editIndex === null) {
        if (addText.trim() === '') {
          toast.error('Task box is empty! Please enter a task.');
        } else {
          handleAddClick();
        }
      } else {
        if (editText.trim() === '') {
          toast.error('Task box is empty! Please enter a task.');
        } else {
          saveEdit();
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="p-2 w-4/5 border rounded-l-md"
          placeholder="Enter what to do"
          value={addText}
          onChange={(e) => setAddText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={editIndex !== null}
        />

        <button
          onClick={handleAddClick}
          className={`ml-0 p-3 bg-indigo-800 text-white ${
            addText.trim() === ''
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-indigo-700'
          } rounded-r-md`}
          disabled={editIndex !== null}
        >
          +
        </button>
      </div>

      <ul className="max-h-64 overflow-y-auto space-y-4 p-4">
        {list.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md w-full max-w-xl"
          >
            {editIndex === index ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="p-2 w-full border rounded-md"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={saveEdit}
                  className="ml-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <span
                className="flex-1 text-left truncate cursor-pointer"
                onClick={() => handleTaskClick(item.id)}
              >
                {item.title}
              </span>
            )}

            {editIndex !== index && (
              <>
                <button
                  className="ml-2 hover:bg-red-800 p-2 rounded-full"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 hover:text-white"
                  />
                </button>

                <button
                  onClick={() => startEdit(index)}
                  className="ml-2 p-2 rounded-full bg-transparent hover:bg-yellow-500 hover:bg-opacity-80"
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-gray-600 hover:text-white"
                  />
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




