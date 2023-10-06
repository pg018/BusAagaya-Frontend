import { IncomingBusQueryResults } from "../../types/App/AppTypes";
import { PassengerItem } from "../../types/Bus/BusTypes";

export interface StartEndLocationDetails {
  startLocation: string;
  startTime: string;
  startCost: number;
  endLocation: string;
  endTime: string;
  endCost: number;
}

// This takes in queried bus object, computes the start and end location user asked for
export const GetStartEndLocationDetails = (
  busResult: IncomingBusQueryResults,
  startLocation: string,
  endLocation: string
): StartEndLocationDetails => {
  let finalStartLocation = busResult.startLocation;
  let finalStartTime = "";
  let finalStartLocationCost = 0;
  let finalEndLocation = endLocation;
  let finalEndTime = "";
  let finalEndLocationCost = 0;
  // checking in list if the startLocation entered by user is same as the bus start location
  if (busResult.startLocation === startLocation) {
    finalStartLocation = busResult.startLocation;
    finalStartTime = busResult.startTime;
    finalStartLocationCost = 0;
  } else {
    // finding for start location in stops
    const findStartLocationInStops = busResult.stops.find(
      (stopItem) => stopItem.stopName === startLocation
    );
    if (findStartLocationInStops !== undefined) {
      finalStartLocation = findStartLocationInStops.stopName;
      finalStartTime = findStartLocationInStops.time;
      finalStartLocationCost = findStartLocationInStops.cost;
    }
  }
  // finding for end location
  const findEndLocationInStops = busResult.stops.find(
    (stopItem) => stopItem.stopName === endLocation
  );
  if (findEndLocationInStops !== undefined) {
    finalEndLocation = findEndLocationInStops.stopName;
    finalEndTime = findEndLocationInStops.time;
    finalEndLocationCost = findEndLocationInStops.cost;
  }
  return {
    startLocation: finalStartLocation,
    startTime: finalStartTime,
    startCost: finalStartLocationCost,
    endLocation: finalEndLocation,
    endTime: finalEndTime,
    endCost: finalEndLocationCost,
  };
};

export const initialIncomingBookTicketItem: IncomingBusQueryResults = {
  id: "-1",
  busOwnerId: "-1",
  startTime: "",
  busName: "",
  startLocation: "",
  busOperatorName: "",
  busOperatorNumber: -1,
  noRows: -1,
  noColumns: -1,
  AfromLeft: true,
  stops: [],
  recurrence: [],
  availableSeats: [],
};

// after the user selects seat for passenger, we are removing the seat from list and returning new list
export const getFinalAvailableSeats = (
  initialAvailableSeats: Array<string>,
  passengerList: Array<PassengerItem>
): Array<string> => {
  const passengerSeatNumbers = passengerList.map(
    (passenger) => passenger.seatNumber
  );
  const finalList = initialAvailableSeats.filter((seatN) => {
    return !passengerSeatNumbers.includes(seatN);
  });
  return finalList;
};
