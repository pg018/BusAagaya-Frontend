export enum ApiLoadingState {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export enum AllowedHttpMethods {
  post = "POST",
  get = "GET",
}

export interface ValidationError {
  statusCode: number;
  errorMessage: string;
}

export interface AppApiConfig {
  signin: string;
  signup: string;
  signout: string;
  getme: string;
  queryBuses: string;
}

export interface BusApiConfig {
  addBus: string;
  reserveBooking: string;
  getProviderBuses: string;
}

export interface UserApiConfig {
  getBookings: string;
}
