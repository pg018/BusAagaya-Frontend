import React, { useMemo } from "react";
import { Col, Divider, Input, Row, Select, Typography } from "antd";
import { IncomingBusQueryResults } from "../../../types/App/AppTypes";
import { PassengerItem } from "../../../types/Bus/BusTypes";
import AddPassenger from "../AddPassenger/AddPassenger";
import { getFinalAvailableSeats } from "../BusResultsHelpers";

const { Option } = Select;

const BusBookModal = ({
  busItem,
  passengerList,
  setPassengerList,
  startCost,
  endCost,
}: {
  busItem: IncomingBusQueryResults;
  passengerList: Array<PassengerItem>;
  setPassengerList: React.Dispatch<React.SetStateAction<Array<PassengerItem>>>;
  startCost: number;
  endCost: number;
}) => {
  const addPassengerButtonHandler = (passengerDetails: PassengerItem) => {
    setPassengerList((prevList) => {
      const oldList = [...prevList];
      oldList.push(passengerDetails);
      return oldList;
    });
  };

  const finalAvailableSeats = useMemo(() => {
    return getFinalAvailableSeats(busItem.availableSeats, passengerList);
  }, [passengerList]);

  return (
    <div>
      <div className="mb-3 flex flex-col gap-1">
        {passengerList?.map((passengerItem, passengerItemIndex) => (
          <div
            key={passengerItemIndex}
            className="flex flex-row justify-between items-center bg-gray-300 p-2 rounded"
          >
            <Typography>{passengerItem.passengerName}</Typography>
            <Typography>{passengerItem.seatNumber}</Typography>
          </div>
        ))}
      </div>
      <AddPassenger
        availableSeats={finalAvailableSeats}
        addButtonHandler={addPassengerButtonHandler}
      />
      <Divider />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Typography className="font-bold">Total Cost: </Typography>
        <Typography>{`${passengerList.length * (endCost - startCost)} Rs`}</Typography>
      </div>
    </div>
  );
};

export default BusBookModal;
