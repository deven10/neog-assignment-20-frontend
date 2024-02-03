import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-20-backend.onrender.com/api/student`;

// read all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.students;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.student;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newStudent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.student;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${studentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.student;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const studentSlice = createSlice({
  name: "studentsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all Students!");
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        toast.success("New Student added successfully!");
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Student!");
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        );
        toast.success("Student Updated successfully!");
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Student!");
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id
        );
        toast.success("Student Deleted successfully!");
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Student!");
      });
  },
});

export default studentSlice.reducer;
