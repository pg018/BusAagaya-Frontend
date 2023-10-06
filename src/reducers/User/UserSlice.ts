import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { InitialUserSliceState } from "../../types/User/UserTypes";
import {
  AllowedHttpMethods,
  ApiLoadingState,
  ValidationError,
} from "../../types/apiTypes";
import { initialValidationError } from "../App/AppConstantData";
import axios, { AxiosError } from "axios";
import { userApi } from "../../apis/apiList";

const initialUserState: InitialUserSliceState = {
  userBookings: [],
  isLoading: ApiLoadingState.idle,
  error: initialValidationError,
};

const getBookingsThunk = createAsyncThunk(
  "User/getBookingsThunk",
  async (_, thunkApi) => {
    try {
      const response = await axios({
        url: userApi.getBookings,
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

const userSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingsThunk.fulfilled, (state, action) => {
      state.userBookings = action.payload;
    });
    builder.addMatcher(isAnyOf(getBookingsThunk.fulfilled), (state) => {
      state.isLoading = ApiLoadingState.succeeded;
    });
    builder.addMatcher(isAnyOf(getBookingsThunk.pending), (state) => {
      state.isLoading = ApiLoadingState.loading;
      state.error = initialValidationError;
    });
    builder.addMatcher(isAnyOf(getBookingsThunk.rejected), (state, action) => {
      state.isLoading = ApiLoadingState.succeeded;
      state.error = action.payload as ValidationError;
    });
  },
});

const userThunks = {
  getBookingsThunk,
};

export const userServices = {
  ...userThunks,
  actions: userSlice.actions,
};

const userReducer = userSlice.reducer;
export default userReducer;
