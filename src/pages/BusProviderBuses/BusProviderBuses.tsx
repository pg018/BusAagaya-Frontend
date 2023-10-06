import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAppDispatch, useTypedSelector } from "../../stateStore";
import { busServices } from "../../reducers/Bus/BusSlice";
import { Card, Modal } from "antd";
import OButton from "../../components/OButton";
import DetailItemTemplate from "../BusResults/BusCard/DetailItemTemplate";
import { getDateObjInReadableFormat } from "../../utils/common";
import BusProviderDetailsModel from "./BusProviderDetailsModel";
import { IncomingBusProviderBusItem } from "../../types/Bus/BusTypes";
import CustomLayout from "../../Wrappers/CustomLayout";

const BusProviderBuses = () => {
  const dispatch = useAppDispatch();
  const busList = useTypedSelector(
    (state) => state.busReducer.busProviderBuses
  );
  const [selectedBus, setSelectedBus] = useState<IncomingBusProviderBusItem>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(busServices.getProviderBusesThunk());
  }, []);

  // view more details button => takes the selected bus and stores it to render
  const viewMoreDetailsButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    busItem: IncomingBusProviderBusItem
  ) => {
    e.preventDefault();
    setSelectedBus(busItem);
    setModalOpen(true);
  };

  // function to close the modal of view more details
  const closeModalButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedBus(undefined);
    setModalOpen(false);
  };

  return (
    <>
      <CustomLayout>
        <Navbar />
        <div style={{ paddingTop: "7rem" }}>
          <div className="flex flex-col max-w-4xl mx-auto gap-3">
            {busList.length === 0 && <Card>No Results</Card>}
            {busList.length > 0 &&
              busList?.map((busItem) => (
                <Card key={busItem.id}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:flex-nowrap">
                    <div className="flex flex-col">
                      <DetailItemTemplate
                        label="Bus Name"
                        data={busItem.busName}
                      />
                      <DetailItemTemplate
                        label="Starting From"
                        data={busItem.startLocation}
                      />
                      <DetailItemTemplate
                        label="Start Time"
                        data={getDateObjInReadableFormat(busItem.startTime)}
                      />
                      <DetailItemTemplate
                        label="No. Of Stops"
                        data={busItem.stops.length.toString()}
                      />
                    </div>
                    <div>
                      <OButton
                        text="View More Details"
                        clickHandler={(e) =>
                          viewMoreDetailsButtonHandler(e, busItem)
                        }
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </CustomLayout>
      <Modal
        title="Bus Details"
        open={isModalOpen}
        footer={null}
        onCancel={closeModalButtonHandler}
      >
        {selectedBus === undefined && <></>}
        {selectedBus !== undefined && (
          <BusProviderDetailsModel
            noRows={selectedBus.noRows}
            noColumns={selectedBus.noColumns}
            busOperatorName={selectedBus.busOperatorName}
            busOperatorNumber={selectedBus.busOperatorNumber}
            stops={selectedBus.stops}
            recurrences={selectedBus.recurrence}
          />
        )}
      </Modal>
    </>
  );
};

export default BusProviderBuses;
