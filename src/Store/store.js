import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "../Features/studentSlice";
import { teacherSlice } from "../Features/teacherSlice";

export default configureStore({
  reducer: {
    students: studentSlice.reducer,
    teachers: teacherSlice.reducer,
  },
});
