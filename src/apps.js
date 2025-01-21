import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import ListTodo from './components/ListTodo';
import { toast } from 'react-toastify';

function Apps() {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setList(data.slice(0, 10)); // Get the first 10 tasks
      } catch (error) {
        toast.error("Error fetching tasks from the server");
      }
    };
    fetchTasks();
  }, []);

  const addList = (inputText) => {
    if (inputText !== '') setList([...list, { title: inputText, id: Date.now() }]);
  };

  const deleteItem = (key) => {
    const newListTodo = [...list];
    newListTodo.splice(key, 1);
    setList(newListTodo);
    toast.success("Task successfully deleted!");
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(list[index].title);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedList = list.map((item, i) =>
        i === editIndex ? { ...item, title: editText } : item
      );
      setList(updatedList);
      setEditIndex(null);
      setEditText('');
      toast.success("Task has been edited successfully!");
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center mb-4">TO-DO LIST</h1>
      <hr className="mb-4" />

      {/* Input to add a new task */}
      <Input addList={addList} />

      <ul className="space-y-2 overflow-y-auto max-h-80 pr-4">
        {list.map((listItem, i) => (
          <ListTodo
            key={listItem.id}
            index={i}
            item={listItem.title}
            taskId={listItem.id} // Pass the task's id here
            deleteItems={deleteItem}
            startEdit={startEdit}
            editIndex={editIndex}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default Apps;
