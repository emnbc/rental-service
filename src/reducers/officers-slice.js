import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Officers } from "../services/http";

export const OFFICERS_FETCH = "OFFICERS_FETCH";
export const CREATE_OFFICER = "CREATE_OFFICER";
export const UPDATE_OFFICER = "UPDATE_OFFICER";
export const DELETE_OFFICER = "DELETE_OFFICER";

const initialState = {
  isLoading: false,
  isProcessing: false,
  isError: false,
  isProcessingError: false,
  data: [],
};

export const fetchAllOfficers = createAsyncThunk(
  OFFICERS_FETCH,
  async () => await Officers.fetch()
);

export const createOfficer = createAsyncThunk(
  CREATE_OFFICER,
  async (data) => await Officers.create(data)
);

export const updateOfficer = createAsyncThunk(
  UPDATE_OFFICER,
  async (data) => await Officers.updateOfficer(data._id, data)
);

export const deleteOfficer = createAsyncThunk(
  DELETE_OFFICER,
  async (id) => await Officers.deleteOfficer(id)
);

export const officersSlice = createSlice({
  name: "officers",
  initialState,
  reducers: {
    reset: () => initialState,
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOfficers.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAllOfficers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data?.officers;
      })
      .addCase(fetchAllOfficers.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(createOfficer.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(createOfficer.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.data = [...state.data, action.payload.data?.data];
      })
      .addCase(createOfficer.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      })

      .addCase(updateOfficer.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(updateOfficer.fulfilled, (state, action) => {
        state.isProcessing = false;
        const { data } = action.payload.data;
        state.data = state.data.map(c => c._id === data._id ? data : c);
      })
      .addCase(updateOfficer.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      })

      .addCase(deleteOfficer.pending, (state) => {
        state.isProcessingError = false;
        state.isProcessing = true;
      })
      .addCase(deleteOfficer.fulfilled, (state, action) => {
        state.isProcessing = false;
        const { arg } = action.meta;
        state.data = state.data.filter(c => c._id !== arg);
      })
      .addCase(deleteOfficer.rejected, (state) => {
        state.isProcessingError = true;
        state.isProcessing = false;
      });
  },
});

export const selectOfficers = (state) => state.officers;

export const { reset, setError } = officersSlice.actions;

export default officersSlice.reducer;
