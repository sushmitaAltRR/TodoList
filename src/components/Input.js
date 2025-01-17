import React, { useState } from 'react';

function Input(props) {
  const [inputText, setInputText] = useState('');

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      props.addList(inputText);
      setInputText('');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="p-2 w-full border rounded-md"
        placeholder="Enter what to do"
        value={inputText}
        onChange={(a) => setInputText(a.target.value)}
        onKeyDown={handleEnterPress}
      />
      <button
        onClick={() => {
          props.addList(inputText);
          setInputText('');
        }}
        className="mt-2 px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-red-700 hover:shadow-lg"
      >
        Add Task
      </button>
    </div>
  );
}

export default Input;
