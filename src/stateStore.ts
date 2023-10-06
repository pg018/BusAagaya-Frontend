import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/App/AppSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import busReducer from "./reducers/Bus/BusSlice";
import userReducer from "./reducers/User/UserSlice";

const stateStore = configureStore({
  reducer: {
    appReducer: appReducer,
    busReducer: busReducer,
    userReducer: userReducer,
  },
});

type RootState = ReturnType<typeof stateStore.getState>;
type AppDispatch = typeof stateStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default stateStore;
