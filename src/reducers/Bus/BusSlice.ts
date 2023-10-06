import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  InitialBusSliceState,
  OutgoingBookTicket,
  OutgoingBusDetails,
} from "../../types/Bus/BusTypes";
import {
  AllowedHttpMethods,
  ApiLoadingState,
  ValidationError,
} from "../../types/apiTypes";
import { initialValidationError } from "../App/AppConstantData";
import axios, { AxiosError } from "axios";
import { busApi } from "../../apis/apiList";

const initialBusState: InitialBusSliceState = {
  isLoading: ApiLoadingState.idle,
  error: initialValidationError,
  busProviderBuses: [],
};

const addNewBusThunk = createAsyncThunk(
  "Bus/addNewBusThunk",
  async (finalBody: OutgoingBusDetails, thunkApi) => {
    try {
      return await axios({
        url: busApi.addBus,
        method: AllowedHttpMethods.post,
        data: { ...finalBody },
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);

const reserveBusThunk = createAsyncThunk(
  "Bus/reserveBusThunk",
  async (finalData: OutgoingBookTicket, thunkApi) => {
    try {
      return await axios({
        url: busApi.reserveBooking,
        method: AllowedHttpMethods.post,
        data: { ...finalData },
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);

const getProviderBusesThunk = createAsyncThunk(
  "Bus/getProviderBusesThunk",
  async (_, thunkApi) => {
    try {
      const response = await axios({
        url: busApi.getProviderBuses,
        method: AllowedHttpMethods.get,
        withCredentials: true,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);

const busSlice = createSlice({
  name: "Bus",
  initialState: initialBusState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProviderBusesThunk.fulfilled, (state, action) => {
      state.busProviderBuses = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        addNewBusThunk.fulfilled,
        reserveBusThunk.fulfilled,
        getProviderBusesThunk.fulfilled
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded;
      }
    );
    builder.addMatcher(
      isAnyOf(
        addNewBusThunk.pending,
        reserveBusThunk.pending,
        getProviderBusesThunk.pending
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading;
        state.error = initialValidationError;
      }
    );
    builder.addMatcher(
      isAnyOf(
        addNewBusThunk.rejected,
        reserveBusThunk.rejected,
        getProviderBusesThunk.rejected
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed;
        state.error = action.payload as ValidationError;
      }
    );
  },
});

const busThunks = {
  addNewBusThunk,
  reserveBusThunk,
  getProviderBusesThunk,
};

export const busServices = {
  ...busThunks,
  actions: busSlice.actions,
};

const busReducer = busSlice.reducer;
export default busReducer;
