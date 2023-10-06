/* This page will only be visible to the user who is registered as bus owner/provider */
import Navbar from "../../components/Navbar/Navbar";
import { Button, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  numberOnlyRegex,
  positiveNumberOnlyRegex,
  weekdaysList,
} from "../../utils/common";
import {
  BusStopDTO,
  BusStopDetails,
  OutgoingBusDetails,
} from "../../types/Bus/BusTypes";
import {
  CheckIfAllStopsAreFull,
  ValidateBusStopsList,
  generateISO8601Date,
} from "./AddBusHelpers";
import BusDetails from "./AddBusComponents/BusDetails";
import BusOperatorDetails from "./AddBusComponents/BusOperatorDetails";
import BusStructure from "./AddBusComponents/BusStructure";
import BusStops from "./AddBusComponents/BusStops/BusStops";
import { useAppDispatch } from "../../stateStore";
import { busServices } from "../../reducers/Bus/BusSlice";
import CustomLayout from "../../Wrappers/CustomLayout";

const AddBus = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [busName, setBusName] = useState<string>("");
  const [startLocation, setStartLocation] = useState<string>("");
  const [startLocationDate, setStartLocationDate] = useState<string>("");
  const [startLocationTime, setStartLocationTime] = useState<string>("");
  const [recurrenceList, setRecurrenceList] =
    useState<Array<string>>(weekdaysList);
  const [operatorName, setOperatorName] = useState<string>("");
  const [operatorNumber, setOperatorNumber] = useState<string>("");
  const [noRows, setNoRows] = useState<string>("");
  const [noColumns, setNoColumns] = useState<string>("");
  const [AfromLeft, setAFromLeft] = useState<boolean>(true);
  const [stopsList, setStopsList] = useState<BusStopDTO[]>([]);
  const [isSubmitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);

  // returns true if validations are correct
  const busNameValidation = useMemo(() => {
    return busName.trim().length > 0;
  }, [busName]);
  const startLocationValidation = useMemo(() => {
    return startLocation.trim().length > 0;
  }, [startLocation]);
  const recurrenceListValidation = useMemo(() => {
    return recurrenceList.length >= 1;
  }, [recurrenceList]);
  const operatorNameValidation = useMemo(() => {
    return operatorName.trim().length > 0;
  }, [operatorName]);
  const operatorNumberValidation = useMemo(() => {
    return (
      numberOnlyRegex.test(operatorNumber) &&
      operatorNumber.trim().length === 10
    );
  }, [operatorNumber]);
  const rowsValidation = useMemo(() => {
    return positiveNumberOnlyRegex.test(noRows) && noRows.trim().length > 0;
  }, [noRows]);
  const columnValidation = useMemo(() => {
    return (
      positiveNumberOnlyRegex.test(noColumns) && noColumns.trim().length > 0
    );
  }, [noColumns]);
  const stopsListValidation = useMemo(() => {
    return ValidateBusStopsList(
      stopsList,
      startLocation,
      startLocationDate,
      startLocationTime
    );
  }, [stopsList, startLocation, startLocationDate, startLocationTime]);
  const stopListInputValidation = useMemo(() => {
    return CheckIfAllStopsAreFull(stopsList);
  }, [stopsList]);

  // validations for locations, date and timings clashes
  useEffect(() => {
    if (
      !stopsListValidation.valid &&
      stopsListValidation.errorPlace === "stopName"
    ) {
      messageApi.open({
        type: "error",
        content: "Stops cannot have same name",
      });
    }
    if (
      !stopsListValidation.valid &&
      stopsListValidation.errorPlace === "Date Time"
    ) {
      messageApi.open({
        type: "error",
        content:
          "Date Time for further stop must be greater than previous ones",
      });
    }
    if (
      !stopsListValidation.valid &&
      stopsListValidation.errorPlace === "startLocStopError"
    ) {
      messageApi.open({
        type: "error",
        content: "Stops Date Time cannot be before Start Location's",
      });
    }
  }, [stopsListValidation]);

  // add bus button is enabled only if all validations are satisfied
  useEffect(() => {
    if (
      busNameValidation &&
      startLocationValidation &&
      recurrenceListValidation &&
      operatorNameValidation &&
      operatorNumberValidation &&
      rowsValidation &&
      columnValidation &&
      stopsListValidation.valid &&
      stopsList.length >= 1 && // end location must be in the stop
      stopListInputValidation
    ) {
      setSubmitBtnEnabled(true);
    } else {
      setSubmitBtnEnabled(false);
    }
  }, [
    busNameValidation,
    startLocationValidation,
    recurrenceListValidation,
    operatorNameValidation,
    operatorNumberValidation,
    rowsValidation,
    columnValidation,
    stopsListValidation,
    stopsList.length,
    stopListInputValidation,
  ]);

  // add bus button handler which consolidates date and calls the api
  const addBusButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const finalData: OutgoingBusDetails = {
      busName,
      startLocation,
      startTime: generateISO8601Date(startLocationDate, startLocationTime),
      recurrence: recurrenceList,
      busOperatorName: operatorName,
      busOperatorNumber: +operatorNumber,
      noRows: +noRows,
      noColumns: +noColumns,
      AfromLeft,
      stops: stopsList.map((stopItem) => {
        const newObj: BusStopDetails = {
          ...stopItem,
          cost: +stopItem.cost,
          time: generateISO8601Date(stopItem.day, stopItem.time),
        };
        return newObj;
      }),
    };
    setSubmitBtnEnabled(false);
    const result = await dispatch(busServices.addNewBusThunk(finalData));
    if (busServices.addNewBusThunk.fulfilled.match(result)) {
      messageApi.open({
        type: "success",
        content: "Bus Added Successfully",
      });
      setTimeout(() => {
        window.location.href = "/mybuses";
      }, 2000);
    }
    setSubmitBtnEnabled(true);
  };

  return (
    <>
      {contextHolder}
      <CustomLayout minHeight="250vh">
        <Navbar />
        <div style={{ height: "50vh", paddingTop: "7rem" }}>
          <div className="flex flex-col items-start bg-white mx-auto max-w-6xl rounded p-4">
            <form className=" w-full flex flex-col">
              <BusDetails
                busName={busName}
                setBusName={setBusName}
                startLocation={startLocation}
                setStartLocation={setStartLocation}
                setStartLocationDate={setStartLocationDate}
                startLocationDate={startLocationDate}
                startLocationTime={startLocationTime}
                setStartLocationTime={setStartLocationTime}
                recurrenceList={recurrenceList}
                setRecurrenceList={setRecurrenceList}
              />
              <BusOperatorDetails
                operatorName={operatorName}
                setOperatorName={setOperatorName}
                operatorNumber={operatorNumber}
                setOperatorNumber={setOperatorNumber}
              />
              <BusStructure
                noRows={noRows}
                setNoRows={setNoRows}
                noColumns={noColumns}
                setNoColumns={setNoColumns}
                AfromLeft={AfromLeft}
                setAFromLeft={setAFromLeft}
              />
              <BusStops stopsList={stopsList} setStopsList={setStopsList} />
              <div className="flex flex-col items-end">
                <Button
                  className="font-bold bg-green-400 hover:bg-blue-500 disabled:bg-green-300"
                  style={{ color: "white" }}
                  disabled={!isSubmitBtnEnabled}
                  onClick={addBusButtonHandler}
                >
                  Add Bus
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CustomLayout>
    </>
  );
};

export default AddBus;
