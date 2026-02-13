import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/apiConfig";

const initialState = {
  notes: [],
  filter: {
    status: "all",
    search: "",
  },
  isLoading: false,
  isError: false,
  message: "",
};

// Helper to get token
const getToken = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state.auth.user?.token;
};

// Fetch Notes
// Async thunk to retrieve all notes from the backend for the current user
export const fetchNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Add Note
// Async thunk to create a new note
export const addNote = createAsyncThunk(
  "notes/add",
  async (noteData, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Delete Note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Update Note (Generic)
// Async thunk to update any property of a note
export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message);
      return resData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Edit Note (Legacy mapping to updateNote)
export const editNote = updateNote;

// Archive Note
export const archiveNote = createAsyncThunk(
  "notes/archive",
  async (id, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes/${id}/archive`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Unarchive Note
export const unarchiveNote = createAsyncThunk(
  "notes/unarchive",
  async (id, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      const response = await fetch(`${API_URL}/api/notes/${id}/unarchive`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.filter.status = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter.search = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(archiveNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(unarchiveNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      });
  },
});

export const { setStatusFilter, setSearchFilter, reset } = noteSlice.actions;
export default noteSlice.reducer;
