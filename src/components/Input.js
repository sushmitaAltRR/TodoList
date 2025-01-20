// import React, { useState } from 'react';

// function Input(props) {
//   const [inputText, setInputText] = useState('');

//   const handleEnterPress = (e) => {
//     if (e.keyCode === 13 && inputText.trim() !== '') {
//       props.addList(inputText);
//       setInputText(''); // Clear input after adding task
//     }
//   };

//   return (
//     <div className="mb-4">
//       <input
//         type="text"
//         className="p-2 w-full border rounded-md"
//         placeholder="Enter what to do"
//         value={inputText}
//         onChange={(a) => setInputText(a.target.value)} // Update state as user types
//         onKeyDown={handleEnterPress}
//       />
//       <button
//         onClick={() => {
//           if (inputText.trim() !== '') {
//             props.addList(inputText);
//             setInputText(''); // Clear input after adding task
//           }
//         }}
//         className={`mt-2 px-4 py-2 rounded-md text-white
//           ${inputText.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-800 hover:bg-red-700'}`}
//         disabled={inputText.trim() === ''} // Disable button when input is empty
//       >
//         Add Task
//       </button>
//     </div>
//   );
// }

// export default Input;

import React, { useState } from 'react';
import { toast } from 'react-toastify';  // Import the toast function

function Input(props) {
  const [inputText, setInputText] = useState('');

  // Function to handle pressing the Enter key
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && inputText.trim() !== '') {
      props.addList(inputText);
      setInputText(''); // Clear input after adding task

      // Show a success toast after adding the task
      toast.success("Task added successfully!");
    }
  };

  // Function to handle Add Task button click
  const handleAddClick = () => {
    if (inputText.trim() === '') {
      // Show a toast notification when the input is empty
      toast.error("Task box is empty! Please enter a task.");
    } else {
      props.addList(inputText);
      setInputText(''); // Clear input after adding task

      // Show a success toast after adding the task
      toast.success("Task added successfully!");
    }
  };

  return (
    <div className="mb-4 flex items-center">
      {/* Shortened text box */}
      <input
        type="text"
        className="p-2 w-4/5 border rounded-l-md"  // Set width of text box to 80% of parent container
        placeholder="Enter what to do"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Update state as user types
        onKeyDown={handleEnterPress}
      />
      
      {/* Button with increased height */}
      <button
        onClick={handleAddClick} // Handle the click event here
        className={`ml-0 p-3 bg-indigo-800 text-white ${inputText.trim() === '' ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'} rounded-r-md`} // Increased padding to make button taller
      >
        +
      </button>
    </div>
  );
}

export default Input;

