import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAppDispatch, useTypedSelector } from "../../stateStore";
import { userServices } from "../../reducers/User/UserSlice";
import { Card, Modal, Typography } from "antd";
import BusCardBasicDetails from "../BusResults/BusCard/BusCardBasicDetails";
import OButton from "../../components/OButton";
import { IncomingUserBookings } from "../../types/User/UserTypes";
import BusDetailsModal from "../BusResults/Modals/BusDetailsModal";
import PassengerDetailItemTemplate from "../BusResults/AddPassenger/PassengerDetailItemTemplate";
import CustomLayout from "../../Wrappers/CustomLayout";

const MyBookings = () => {
  const dispatch = useAppDispatch();
  const userBookings = useTypedSelector(
    (state) => state.userReducer.userBookings
  );
  const [selectedBooking, setSelectedBooking] =
    useState<IncomingUserBookings>();
  const [isMoreDetailsModalOpen, setMoreDetailsModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(userServices.getBookingsThunk());
  }, []);

  const viewDetailsButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    bookingItem: IncomingUserBookings
  ) => {
    e.preventDefault();
    setSelectedBooking(bookingItem);
    setMoreDetailsModalOpen(true);
  };

  const closeModalButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedBooking(undefined);
    setMoreDetailsModalOpen(false);
  };

  return (
    <>
      <CustomLayout>
        <Navbar />
        <div style={{ paddingTop: "7rem" }}>
          <div className="flex flex-col max-w-4xl mx-auto gap-3">
            {userBookings.length === 0 && <Card>No Results</Card>}
            {userBookings.length > 0 &&
              userBookings?.map((booking) => (
                <Card key={booking.bookingId}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:flex-nowrap">
                    <div className="flex flex-col">
                      <BusCardBasicDetails
                        busName={booking.busName}
                        startLocation={booking.startLocation}
                        endLocation={booking.endLocation}
                        startTime={booking.travelDate}
                        endTime={booking.destinationDate}
                      />
                    </div>
                    <div>
                      <OButton
                        text="View More Details"
                        clickHandler={(e) => {
                          viewDetailsButtonHandler(e, booking);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </CustomLayout>
      <Modal
        open={isMoreDetailsModalOpen}
        footer={null}
        onCancel={closeModalButtonHandler}
      >
        {selectedBooking === undefined && <></>}
        {selectedBooking !== undefined && (
          <>
            <BusDetailsModal
              busOperatorName={selectedBooking.busOperatorName}
              busOperatorNumber={selectedBooking.busOperatorNumber}
              startTime={selectedBooking.travelDate}
              showNoSeats={false}
              showStops={false}
            />
            {selectedBooking.passengerDetails?.map(
              (passenger, passengerIndex) => (
                <div
                  className="bg-gray-200 p-2 flex flex-col gap-2"
                  key={passengerIndex}
                >
                  <Typography className="font-bold">
                    PASSENGER {passengerIndex + 1}
                  </Typography>
                  <hr />
                  <PassengerDetailItemTemplate
                    label="Name"
                    labelMd={6}
                    itemMd={12}
                  >
                    <Typography>{passenger.passengerName}</Typography>
                  </PassengerDetailItemTemplate>
                  <PassengerDetailItemTemplate
                    label="Age"
                    labelMd={6}
                    itemMd={12}
                  >
                    <Typography>{passenger.passengerAge}</Typography>
                  </PassengerDetailItemTemplate>
                  <PassengerDetailItemTemplate
                    label="Gender"
                    labelMd={6}
                    itemMd={12}
                  >
                    <Typography>{passenger.passengerGender}</Typography>
                  </PassengerDetailItemTemplate>
                  <PassengerDetailItemTemplate
                    label="Seat Number"
                    labelMd={6}
                    itemMd={12}
                  >
                    <Typography>{passenger.seatNumber}</Typography>
                  </PassengerDetailItemTemplate>
                </div>
              )
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default MyBookings;
