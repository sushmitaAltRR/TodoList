
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  editIndex: null,
  editText: '',
  addText: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      const deletedTask = state.tasks[action.payload].title;
      state.tasks.splice(action.payload, 1);  
      console.log(`Task "${deletedTask}" has been deleted.`);
    },
    startEditing(state, action) {
      state.editIndex = action.payload.index;
      state.editText = action.payload.text;
    },
    saveEdit(state) {
      if (state.editText.trim()) {
        state.tasks[state.editIndex].title = state.editText;
        state.editIndex = null;
        state.editText = '';
      }
    },
    setAddText(state, action) {
      state.addText = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  startEditing,
  saveEdit,
  setAddText,
} = taskSlice.actions;

export default taskSlice.reducer;

