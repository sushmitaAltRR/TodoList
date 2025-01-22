import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    addText: '',
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    setAddText: (state, action) => {
      state.addText = action.payload;
    },
  },
});

export const { setTasks, addTask, deleteTask, setAddText } = taskSlice.actions;
export default taskSlice.reducer;