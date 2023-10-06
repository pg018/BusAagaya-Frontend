import dayjs from "dayjs";
import { BusStopDTO } from "../../types/Bus/BusTypes";

// reorders the stops
export const reOrderStops = (stopsList: BusStopDTO[]) => {
  return stopsList.map((item, itemIndex) => {
    return { ...item, order: itemIndex + 1 };
  });
};

// dateString => YYYY-MM-DD and timeString=>HH:mm
export const generateISO8601Date = (dateString: string, timeString: string) => {
  const combined = `${dateString}T${timeString}`;
  const iso8601Date = dayjs(combined).toISOString();
  return iso8601Date;
};

// checking if the stops name is not same, stop date and time for futher stops is more than previous
export const ValidateBusStopsList = (
  stopsList: BusStopDTO[],
  startLocation: string,
  startLocationDate: string,
  startLocationTime: string
): {
  errorPlace: "stopName" | "Date Time" | "" | "startLocStopError";
  valid: true | false;
} => {
  // checking if anything matches with startLocation
  const isExists = stopsList.find((item) => item.stopName === startLocation);
  if (isExists && startLocation !== "") {
    return { errorPlace: "stopName", valid: false };
  }
  // just checking for the first index as the rest must be greater than first index is validated below
  const firstStop = stopsList.at(0);
  if (
    firstStop &&
    startLocationDate !== "" &&
    startLocationTime !== "" &&
    firstStop.day !== "" &&
    firstStop.time !== ""
  ) {
    const startLocationDateObj = dayjs(
      generateISO8601Date(startLocationDate, startLocationTime)
    );
    const firstStopDateObj = dayjs(
      generateISO8601Date(firstStop.day, firstStop.time)
    );
    if (firstStopDateObj.isBefore(startLocationDateObj)) {
      return { errorPlace: "startLocStopError", valid: false };
    }
  }
  for (let i = 1; i < stopsList.length; i++) {
    const currentStop = stopsList[i];
    const previousStop = stopsList[i - 1];

    // Check if stop names are the same
    if (
      currentStop.stopName === previousStop.stopName &&
      currentStop.stopName !== "" &&
      previousStop.stopName !== ""
    ) {
      return { errorPlace: "stopName", valid: false };
    }

    // Convert date and time strings to Dayjs objects for comparison
    if (
      currentStop.day !== "" &&
      currentStop.time !== "" &&
      previousStop.day !== "" &&
      previousStop.time !== ""
    ) {
      const currentDate = dayjs(
        generateISO8601Date(currentStop.day, currentStop.time)
      );
      const previousDate = dayjs(
        generateISO8601Date(previousStop.day, previousStop.time)
      );

      // Check if date and time of current stop is after previous stop
      if (currentDate.isBefore(previousDate)) {
        return { errorPlace: "Date Time", valid: false };
      }
    }
  }

  return { errorPlace: "", valid: true };
};

// returns true if stop details are filled completely
export const CheckIfAllStopsAreFull = (stopList: Array<BusStopDTO>) => {
  const filteredList = stopList.filter(
    (stopItem) =>
      stopItem.stopName === "" ||
      stopItem.cost === "" ||
      stopItem.day === "" ||
      stopItem.time === ""
  );
  if (filteredList.length > 0) {
    return false;
  }
  return true;
};
