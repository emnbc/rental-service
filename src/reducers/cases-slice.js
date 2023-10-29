import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cases } from "../services/http";

export const CASES_FETCH = "CASES_FETCH";
export const CREATE_CASE = "CREATE_CASE";
export const UPDATE_CASE = "UPDATE_CASE";
export const DELETE_CASE = "DELETE_CASE";

const initialState = {
  isLoading: false,
  isProcessing: false,
  isError: false,
  isProcessingError: false,
  data: [],
};

export const fetchAllCases = createAsyncThunk(
  CASES_FETCH,
  async () => await Cases.fetch()
);

export const createCase = createAsyncThunk(
  CREATE_CASE,
  async (data) => await Cases.create(data)
);

export const updateCase = createAsyncThunk(
  UPDATE_CASE,
  async (data) => await Cases.updateCase(data._id, data)
);

export const deleteCase = createAsyncThunk(
  DELETE_CASE,
  async (id) => await Cases.deleteCase(id)
);

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    reset: () => initialState,
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCases.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAllCases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data?.data;
      })
      .addCase(fetchAllCases.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(createCase.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.data = [...state.data, action.payload.data?.data];
      })
      .addCase(createCase.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      })

      .addCase(updateCase.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.isProcessing = false;
        const { data } = action.payload.data;
        state.data = state.data.map(c => c._id === data._id ? data : c);
      })
      .addCase(updateCase.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      })

      .addCase(deleteCase.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.isProcessing = false;
        const { arg } = action.meta;
        state.data = state.data.filter(c => c._id !== arg);
      })
      .addCase(deleteCase.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      });
  },
});

export const selectCases = (state) => state.cases;

export const { reset, setError } = casesSlice.actions;

export default casesSlice.reducer;
