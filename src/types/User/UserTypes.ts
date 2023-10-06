import { BusStopDetails, PassengerItem } from "../Bus/BusTypes";
import { ApiLoadingState, ValidationError } from "../apiTypes";

export interface IncomingUserBookings {
  bookingId: string;
  busName: string;
  travelDate: string;
  destinationDate: string;
  startLocation: string;
  endLocation: string;
  passengerDetails: Array<PassengerItem>;
  busOperatorName: string;
  busOperatorNumber: number;
  stops: Array<BusStopDetails>;
}

export interface InitialUserSliceState {
  userBookings: Array<IncomingUserBookings>;
  isLoading: ApiLoadingState;
  error: ValidationError;
}
