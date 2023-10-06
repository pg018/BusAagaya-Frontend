import { Card, Modal, Typography, message } from "antd";
import { IncomingBusQueryResults } from "../../../types/App/AppTypes";
import { useMemo, useState } from "react";
import {
  GetStartEndLocationDetails,
  initialIncomingBookTicketItem,
} from "../BusResultsHelpers";
import OButton from "../../../components/OButton";
import BusDetailsModal from "../Modals/BusDetailsModal";
import BusBookModal from "../Modals/BusBookModal";
import { OutgoingBookTicket, PassengerItem } from "../../../types/Bus/BusTypes";
import { useAppDispatch, useTypedSelector } from "../../../stateStore";
import { initialUserData } from "../../../reducers/App/AppConstantData";
import { busServices } from "../../../reducers/Bus/BusSlice";
import BusCardBasicDetails from "./BusCardBasicDetails";
import { primaryColor } from "../../../utils/common";

const BusCard = ({
  busItem,
  enteredStartLocation,
  enteredEndLocation,
}: {
  busItem: IncomingBusQueryResults;
  enteredStartLocation: string;
  enteredEndLocation: string;
}) => {
  const [messageApi, messageContext] = message.useMessage();
  const dispatch = useAppDispatch();
  const userData = useTypedSelector((state) => state.appReducer.userData);
  const finalData = useMemo(() => {
    return GetStartEndLocationDetails(
      busItem,
      enteredStartLocation,
      enteredEndLocation
    );
  }, [busItem, enteredStartLocation, enteredEndLocation]);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [bookTicketModal, setBookTicketModal] = useState<boolean>(false);
  const [bookTicketItem, setBookTicketItem] = useState<IncomingBusQueryResults>(
    initialIncomingBookTicketItem
  );
  const [passengerList, setPassengerList] = useState<Array<PassengerItem>>([]);

  const showMoreDetailsButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowDetailsModal(true);
  };

  const closeMoreDetailsButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowDetailsModal(false);
  };

  const bookTicketButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    busItem: IncomingBusQueryResults
  ) => {
    e.preventDefault();
    if (userData.id === initialUserData.id) {
      window.location.href = "/signin";
      return;
    }
    setBookTicketItem(busItem);
    setBookTicketModal(true);
  };

  const closeBookTicketHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBookTicketItem(initialIncomingBookTicketItem);
    setPassengerList([]);
    setBookTicketModal(false);
  };

  // function for the book ticket modal which calls the api
  const bookTicketModalOkHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (userData.id === initialUserData.id) {
      window.location.href = "/signin";
      return;
    }
    if (passengerList.length === 0) {
      alert("Please Enter Passenger Details!");
      return;
    }
    const finalOutgoingData: OutgoingBookTicket = {
      busId: busItem.id,
      startLocation: enteredStartLocation,
      endLocation: enteredEndLocation,
      passengerDetails: passengerList,
      totalCost:
        passengerList.length * (finalData.endCost - finalData.startCost),
      travelDate: finalData.startTime,
      destinationDate: finalData.endTime,
    };
    console.log(finalOutgoingData);
    const result = await dispatch(
      busServices.reserveBusThunk(finalOutgoingData)
    );
    if (busServices.reserveBusThunk.fulfilled.match(result)) {
      // succeded
      setBookTicketModal(false);
      setPassengerList([]);
      messageApi.open({
        type: "success",
        content: "Bus Booked Successfully!",
      });
      setTimeout(() => {
        window.location.href = "/mybookings";
      }, 2000);
    }
  };

  return (
    <>
      {messageContext}
      <Card>
        <div className="flex flex-col flex-wrap md:flex-nowrap md:flex-row items-center justify-between">
          <div className="flex flex-col">
            <BusCardBasicDetails
              startLocation={finalData.startLocation}
              endLocation={finalData.endLocation}
              busName={busItem.busName}
              startTime={finalData.startTime}
              endTime={finalData.endTime}
            />
            <div className="flex flex-row items-center">
              <Typography className="font-bold">Cost:&nbsp;</Typography>
              <Typography>
                {`${finalData.endCost - finalData.startCost} Rs/Passenger`}
              </Typography>
            </div>
            <div className="mt-3">
              <OButton
                clickHandler={showMoreDetailsButtonHandler}
                text="View More Details"
              />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <OButton
              text="Book"
              clickHandler={(e) => {
                bookTicketButtonHandler(e, busItem);
              }}
              disabled={
                // no available seats
                busItem.availableSeats.length === 0 ||
                // past today's date
                new Date(finalData.startTime) <= new Date()
              }
            />
            <Typography className="font-bold mt-2">
              {busItem.availableSeats.length} Seats left!
            </Typography>
          </div>
        </div>
      </Card>
      <Modal
        title="Bus Details"
        onCancel={closeMoreDetailsButtonHandler}
        open={showDetailsModal}
        footer={null}
      >
        <BusDetailsModal
          busOperatorName={busItem.busOperatorName}
          busOperatorNumber={busItem.busOperatorNumber}
          startTime={busItem.startTime}
          noRows={busItem.noRows}
          noColumns={busItem.noColumns}
          startLocation={busItem.startLocation}
          stops={busItem.stops}
        />
      </Modal>
      <Modal
        title="Book Ticket"
        open={bookTicketModal}
        onCancel={closeBookTicketHandler}
        okButtonProps={{
          title: "Book",
          className: `${primaryColor} disabled:bg-orange-300`,
          onClick: bookTicketModalOkHandler,
        }}
      >
        <BusBookModal
          busItem={bookTicketItem}
          passengerList={passengerList}
          setPassengerList={setPassengerList}
          startCost={finalData.startCost}
          endCost={finalData.endCost}
        />
      </Modal>
    </>
  );
};

export default BusCard;
