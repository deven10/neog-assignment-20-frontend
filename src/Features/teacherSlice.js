import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  teachers: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-20-backend.onrender.com/api/teacher`;

// read all teachers
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.teachers;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new teacher
export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.teacher;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing teacher
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newTeacher, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.teacher;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing teacher
export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (teacherId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${teacherId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.teacher;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const teacherSlice = createSlice({
  name: "teachersDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all Teachers!");
      })
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
        toast.success("New Teacher added successfully!");
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Teacher!");
      })
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        );
        toast.success("Teacher Updated successfully!");
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Teacher!");
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload._id
        );
        toast.success("Teacher Deleted successfully!");
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Teacher!");
      });
  },
});

export default teacherSlice.reducer;
