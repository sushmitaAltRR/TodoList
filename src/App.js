// import React, { useState } from 'react';
// import Input from './components/Input';
// import ListTodo from './components/ListTodo';
// import hardcodedTasks from './components/hardcode';

// function App() {
//   const [list, setList] = useState(hardcodedTasks);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editText, setEditText] = useState("");

//   const addList = (inputText) => {
//     if (inputText !== '') setList([...list, inputText]);
//   };

//   const deleteItem = (key) => {
//     const newListTodo = [...list];
//     newListTodo.splice(key, 1);
//     setList(newListTodo);
//   };

//   const startEdit = (index) => {
//     setIsEditing(true);
//     setEditIndex(index);
//     setEditText(list[index]);
//   };

//   const saveEdit = () => {
//     if (editText.trim()) {
//       const updatedList = list.map((item, i) =>
//         i === editIndex ? editText : item
//       );
//       setList(updatedList);
//       setIsEditing(false);
//       setEditIndex(null);
//       setEditText("");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
//       <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
//         <hr className="mb-4" />

//         {isEditing && (
//           <div className="mb-4">
//             <input
//               type="text"
//               className="p-2 w-full border rounded-md"
//               value={editText}
//               onChange={(e) => setEditText(e.target.value)}
//             />
//             <button
//               onClick={saveEdit}
//               className="mt-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
//             >
//               Save
//             </button>
//           </div>
//         )}

//         <Input addList={addList} />

//         <ul className="space-y-2">
//           {list.map((listItem, i) => (
//             <ListTodo
//               key={i}
//               index={i}
//               item={listItem}
//               deleteItems={deleteItem}
//               startEdit={startEdit}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import Input from './components/Input';
// import ListTodo from './components/ListTodo';
// import hardcodedTasks from './components/hardcode';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // Import styles for Toastify

// function App() {
//   const [list, setList] = useState(hardcodedTasks);
//   const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
//   const [editText, setEditText] = useState('');

//   // Add new task to the list
//   const addList = (inputText) => {
//     if (inputText !== '') setList([...list, inputText]);
//   };

//   // Delete task
//   const deleteItem = (key) => {
//     const newListTodo = [...list];
//     newListTodo.splice(key, 1);
//     setList(newListTodo);
//   };

//   // Start editing task
//   const startEdit = (index) => {
//     setEditIndex(index); // Set the index of the task being edited
//     setEditText(list[index]); // Set the text of the task being edited
//   };

//   // Save edited task
//   const saveEdit = () => {
//     if (editText.trim()) {
//       const updatedList = list.map((item, i) =>
//         i === editIndex ? editText : item
//       );
//       setList(updatedList);
//       setEditIndex(null); // Reset edit index
//       setEditText(''); // Clear the input

//       // Show the success toast after editing
//       toast.success("Task has been edited successfully!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
//       <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
//         <hr className="mb-4" />

//         {/* Input field to add a new task */}
//         <Input addList={addList} />

//         <ul className="space-y-2">
//           {list.map((listItem, i) => (
//             <ListTodo
//               key={i}
//               index={i}
//               item={listItem}
//               deleteItems={deleteItem}
//               startEdit={startEdit} // Start editing task
//               editIndex={editIndex}
//               editText={editText}
//               setEditText={setEditText}
//               saveEdit={saveEdit}
//             />
//           ))}
//         </ul>
//       </div>

//       {/* Toast Container to display toast notifications */}
//       <ToastContainer 
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }

// export default App;




//After api call

import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import ListTodo from './components/ListTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import styles for Toastify

function App() {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
  const [editText, setEditText] = useState('');

  // Fetch tasks from API
  useEffect(() => {
    // Fetching todo tasks from JSONPlaceholder API
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        // Store the first 10 tasks to keep it manageable
        setList(data.slice(0, 10));
      } catch (error) {
        toast.error("Error fetching tasks from the server");
      }
    };
    fetchTasks();
  }, []); // Empty dependency array to run the effect only once on component mount

  // Add new task to the list
  const addList = (inputText) => {
    if (inputText !== '') setList([...list, { title: inputText, id: Date.now() }]);
  };

  // Delete task
  const deleteItem = (key) => {
    const newListTodo = [...list];
    newListTodo.splice(key, 1);
    setList(newListTodo);
  };

  // Start editing task
  const startEdit = (index) => {
    setEditIndex(index); // Set the index of the task being edited
    setEditText(list[index].title); // Set the text of the task being edited
  };

  // Save edited task
  const saveEdit = () => {
    if (editText.trim()) {
      const updatedList = list.map((item, i) =>
        i === editIndex ? { ...item, title: editText } : item
      );
      setList(updatedList);
      setEditIndex(null); // Reset edit index
      setEditText(''); // Clear the input

      // Show the success toast after editing
      toast.success("Task has been edited successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
      <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
        <hr className="mb-4" />

        {/* Input field to add a new task */}
        <Input addList={addList} />

        {/* List container with added space between list and scrollbar */}
        <ul className="space-y-2 max-h-64 overflow-y-auto p-4">
          {list.map((listItem, i) => (
            <ListTodo
              key={listItem.id}
              index={i}
              item={listItem.title}
              deleteItems={deleteItem}
              startEdit={startEdit} // Start editing task
              editIndex={editIndex}
              editText={editText}
              setEditText={setEditText}
              saveEdit={saveEdit}
            />
          ))}
        </ul>
      </div>

      {/* Toast Container to display toast notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
