import { Divider } from "antd";
import Title from "antd/es/typography/Title";
import OButton from "../../../../components/OButton";
import StopTemplate from "./StopTemplate";
import { BusStopDTO } from "../../../../types/Bus/BusTypes";
import { reOrderStops } from "../../AddBusHelpers";
import Typography from "antd/es/typography/Typography";

const BusStops = ({
  stopsList,
  setStopsList,
}: {
  stopsList: Array<BusStopDTO>;
  setStopsList: React.Dispatch<React.SetStateAction<Array<BusStopDTO>>>;
}) => {
  // used to add new empty stop in the list
  const addStopInListHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    prevOrder: number
  ) => {
    e.preventDefault();
    const newObj: BusStopDTO = {
      stopName: "",
      cost: "",
      order: prevOrder + 1, // we received the previous order, for new order increment again
      day: "",
      time: "",
    };
    const oldList = [...stopsList];
    oldList.push(newObj);
    setStopsList(oldList);
  };

  // deletes the stop from the list while mainting the order
  const stopDeleteHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    currOrder: number
  ) => {
    e.preventDefault();
    setStopsList((prevStopsList) => {
      if (prevStopsList.length === 1) {
        return []; // Return a new empty array if there's only one stop
      }
      return reOrderStops(
        prevStopsList.filter((stop) => stop.order !== currOrder)
      );
    });
  };

  // updates the list in case of data changes
  const stopDataUpdateHandler = (finalData: BusStopDTO) => {
    const oldList = [...stopsList];
    const newList = oldList.map((stopItem) => {
      if (stopItem.order === finalData.order) {
        return finalData;
      }
      return stopItem;
    });
    setStopsList(newList);
  };

  return (
    <div className="mb-5">
      <div>
        <Title level={3} style={{ fontWeight: "bold" }}>
          Stops
        </Title>
        <Divider />
        <Typography className="mb-2 font-bold">
          Note: End Location must be included as stop
        </Typography>
      </div>
      <div className="flex flex-col">
        {stopsList.length === 0 && (
          <div className="flex flex-col items-center">
            <OButton
              text="+Add Stop"
              clickHandler={(e) => addStopInListHandler(e, 0)}
            />
          </div>
        )}
        {stopsList.map((stopItem, stopItemIndex) => (
          <div
            className="bg-gray-200 p-5 rounded relative flex flex-col mb-2"
            key={stopItemIndex}
          >
            <StopTemplate
              busStop={stopItem}
              deleteButtonHandler={stopDeleteHandler}
              stopDataUpdateHandler={stopDataUpdateHandler}
            />
            <div className="flex flex-col items-center z-10 absolute inset-x-0 md:top-3/4 mt-2">
              <OButton
                text="+"
                clickHandler={(e) => {
                  addStopInListHandler(e, stopItemIndex + 1);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-3"></div>
    </div>
  );
};

export default BusStops;
