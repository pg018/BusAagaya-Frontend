import { BusStopDetails } from "../Bus/BusTypes";
import { ApiLoadingState, ValidationError } from "../apiTypes";

export enum UserType {
  user = "user",
  busoffice = "busoffice",
}

export interface OutgoingBusQuery {
  startLocation: string;
  endLocation: string;
  travelDate: string;
}

export interface OutgoingSignInDetails {
  emailId: string;
  password: string;
}

export interface OutgoingSignUpDetails extends OutgoingSignInDetails {
  displayName: string;
  confirmPassword: string;
  mobileNumber: number;
  type: string;
}

export interface IncomingUserData {
  id: string;
  displayName: string;
  emailId: string;
  mobileNumber: number;
  dateOfBirth: Date;
  dateOfJoining: Date;
  type: string;
}

export interface IncomingBusQueryResults {
  id: string;
  busOwnerId: string;
  startTime: string;
  busName: string;
  startLocation: string;
  busOperatorName: string;
  busOperatorNumber: number;
  noRows: number;
  noColumns: number;
  AfromLeft: boolean;
  stops: Array<BusStopDetails>;
  recurrence: Array<string>;
  availableSeats: Array<string>;
}

export interface InitialAppSliceState {
  isLoading: ApiLoadingState;
  userData: IncomingUserData;
  busQueryResults: Array<IncomingBusQueryResults>;
  error: ValidationError;
}
