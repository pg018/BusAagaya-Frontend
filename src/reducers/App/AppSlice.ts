import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  InitialAppSliceState,
  OutgoingSignInDetails,
  OutgoingSignUpDetails,
  OutgoingBusQuery,
} from "../../types/App/AppTypes";
import {
  AllowedHttpMethods,
  ApiLoadingState,
  ValidationError,
} from "../../types/apiTypes";
import { initialUserData, initialValidationError } from "./AppConstantData";
import axios, { AxiosError } from "axios";
import { appApi } from "../../apis/apiList";

const signupThunk = createAsyncThunk(
  "App/signupThunk",
  async (finalBody: OutgoingSignUpDetails, thunkApi) => {
    try {
      return await axios({
        url: appApi.signup,
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

const signinThunk = createAsyncThunk(
  "App/signinThunk",
  async (finalData: OutgoingSignInDetails, thunkApi) => {
    try {
      return await axios({
        url: appApi.signin,
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

const getmeThunk = createAsyncThunk("App/getmeThunk", async (_, thunkApi) => {
  try {
    const response = await axios({
      url: appApi.getme,
      method: AllowedHttpMethods.get,
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return thunkApi.rejectWithValue(err.response?.data);
  }
});

const queryBusesThunk = createAsyncThunk(
  "App/queryBusesThunk",
  async (finalBody: OutgoingBusQuery, thunkApi) => {
    try {
      const response = await axios({
        url: appApi.queryBuses,
        method: AllowedHttpMethods.post,
        data: { ...finalBody },
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

const signoutThunk = createAsyncThunk(
  "App/signoutThunk",
  async (_, thunkApi) => {
    try {
      return await axios({
        url: appApi.signout,
        method: AllowedHttpMethods.post,
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
);

const initialAppState: InitialAppSliceState = {
  isLoading: ApiLoadingState.idle,
  userData: initialUserData,
  error: initialValidationError,
  busQueryResults: [],
};

const appSlice = createSlice({
  name: "App",
  initialState: initialAppState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getmeThunk.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(queryBusesThunk.fulfilled, (state, action) => {
      state.busQueryResults = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        signinThunk.fulfilled,
        signupThunk.fulfilled,
        getmeThunk.fulfilled,
        queryBusesThunk.fulfilled,
        signoutThunk.fulfilled
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded;
      }
    );
    builder.addMatcher(
      isAnyOf(
        signupThunk.pending,
        signinThunk.pending,
        getmeThunk.pending,
        queryBusesThunk.pending,
        signoutThunk.pending
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading;
        state.error = initialValidationError;
      }
    );
    builder.addMatcher(
      isAnyOf(
        signupThunk.rejected,
        signinThunk.rejected,
        signoutThunk.rejected,
        queryBusesThunk.rejected
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed;
        state.error = action.payload as ValidationError;
      }
    );
  },
});

const appReducers = {
  signupThunk,
  signinThunk,
  getmeThunk,
  queryBusesThunk,
  signoutThunk,
};

export const appServices = {
  ...appReducers,
  actions: appSlice.actions,
};

const appReducer = appSlice.reducer;
export default appReducer;
