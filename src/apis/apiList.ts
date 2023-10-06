import { AppApiConfig, BusApiConfig, UserApiConfig } from "../types/apiTypes";

const baseUrl = "http://localhost:5000";

export const appApi: AppApiConfig = {
  signin: baseUrl + "/auth/signin",
  signup: baseUrl + "/auth/signup",
  signout: baseUrl + "/auth/signout",
  getme: baseUrl + "/auth/getme",
  queryBuses: baseUrl + "/bus/getquerybus",
};

export const busApi: BusApiConfig = {
  addBus: baseUrl + "/bus/addbus",
  reserveBooking: baseUrl + "/bus/reservebus",
  getProviderBuses: baseUrl + "/bus/getproviderbookings",
};

export const userApi: UserApiConfig = {
  getBookings: baseUrl + "/user/getbookings",
};
