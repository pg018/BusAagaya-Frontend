import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAppDispatch, useTypedSelector } from "../../stateStore";
import { appServices } from "../../reducers/App/AppSlice";
import BusCard from "./BusCard/BusCard";
import CustomLayout from "../../Wrappers/CustomLayout";
import { Card } from "antd";
import { resetHoursAndMinutes } from "../../utils/common";
import { generateISO8601Date } from "../AddBus/AddBusHelpers";

// this page is where the results for the queried is shown

const BusResults = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startLocation = queryParams.get("startLocation");
  const endLocation = queryParams.get("endLocation");
  const travelDate = queryParams.get("travelDate");
  const [enteredStartLocation, setEnteredStartLocation] = useState<string>("");
  const [enteredEndLocation, setEnteredEndLocation] = useState<string>("");
  const BusResultsArray = useTypedSelector(
    (state) => state.appReducer.busQueryResults
  );

  // fetching the data through api from backend
  useEffect(() => {
    if (startLocation && endLocation && travelDate) {
      console.log(travelDate);
      dispatch(
        appServices.queryBusesThunk({
          startLocation,
          endLocation,
          travelDate, // already in utc format
        })
      );
      setEnteredStartLocation(startLocation);
      setEnteredEndLocation(endLocation);
    }
  }, [startLocation, endLocation, travelDate]);

  return (
    <CustomLayout>
      <Navbar />
      <div style={{ paddingTop: "7rem" }}>
        <div className="flex flex-col max-w-4xl mx-auto gap-2">
          {BusResultsArray.length > 0 &&
            BusResultsArray?.map((busItem) => (
              <BusCard
                key={busItem.id}
                busItem={busItem}
                enteredStartLocation={enteredStartLocation}
                enteredEndLocation={enteredEndLocation}
              />
            ))}
          {BusResultsArray.length === 0 && <Card>No Results!</Card>}
        </div>
      </div>
    </CustomLayout>
  );
};

export default BusResults;
