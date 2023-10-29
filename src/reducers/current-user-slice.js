import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../services/http";

export const CURRENT_USER_FETCH = "CURRENT_USER_FETCH";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

export const fetchCurrentUser = createAsyncThunk(
  CURRENT_USER_FETCH,
  async () => await Auth.auth()
);

export const currentUserSlice = createSlice({
  name: "current-user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data?.data?.user;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const selectUser = (state) => state.currentUser;

export const { reset, setError, setUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
