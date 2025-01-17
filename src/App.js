import React, { useState } from 'react';
import Input from './components/Input';
import ListTodo from './components/ListTodo';
import hardcodedTasks from './components/hardcode';

function App() {
  const [list, setList] = useState(hardcodedTasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new task to the list
  const addList = (inputText) => {
    if (inputText !== '') setList([...list, inputText]);
  };

  // Delete task
  const deleteItem = (key) => {
    const newListTodo = [...list];
    newListTodo.splice(key, 1);
    setList([...newListTodo]);
  };

  // Start editing task
  const startEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditText(list[index]);
  };
  

  // Save edited task
  const saveEdit = () => {
    if (editText.trim()) {
      const updatedList = list.map((item, i) =>
        i === editIndex ? editText : item
      );
      setList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
      setEditText("");
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300 p-5">
      <div className="max-w-lg w-full bg-indigo-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
        <hr className="mb-4" />

        {isEditing && (
          <div className="mb-4">
            <input
              type="text"
               className="p-2 w-full border rounded-md"
              value={editText}
              onChange={(e) => setEditText(e.target.value)} // Update task text while editing
            />
           <button
  onClick={saveEdit}
  className="mt-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
>
  Save
</button>

          </div>
        )}

        <Input addList={addList} />

        <ul className="space-y-2">
          {list.map((listItem, i) => (
            <ListTodo
            key={i}
            index={i}
            item={listItem}
            deleteItems={deleteItem}
            startEdit={startEdit} // Passing startEdit as a prop
          />
           ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
