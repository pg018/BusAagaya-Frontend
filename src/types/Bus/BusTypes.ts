import { ApiLoadingState, ValidationError } from "../apiTypes";

export interface BusStopDTO {
  stopName: string;
  cost: string;
  day: string;
  time: string;
  order: number;
}

export interface BusStopDetails {
  stopName: string;
  cost: number;
  order: number;
  time: string;
}

export interface OutgoingBusDetails {
  busName: string;
  startLocation: string;
  startTime: string;
  busOperatorName: string;
  busOperatorNumber: number;
  noRows: number;
  noColumns: number;
  AfromLeft: boolean;
  stops: Array<BusStopDetails>;
  recurrence: Array<string>;
}

export interface PassengerItem {
  passengerName: string;
  passengerAge: number;
  seatNumber: string;
  passengerGender: string;
}

export interface OutgoingBookTicket {
  busId: string;
  startLocation: string;
  endLocation: string;
  passengerDetails: Array<PassengerItem>;
  travelDate: string;
  destinationDate: string;
  totalCost: number;
}

export interface IncomingBusProviderBusItem {
  id: string;
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
}

export interface InitialBusSliceState {
  busProviderBuses: Array<IncomingBusProviderBusItem>;
  isLoading: ApiLoadingState;
  error: ValidationError;
}
