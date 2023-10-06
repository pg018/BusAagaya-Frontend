import { Typography } from "antd";
import PassengerDetailItemTemplate from "../BusResults/AddPassenger/PassengerDetailItemTemplate";
import { BusStopDetails } from "../../types/Bus/BusTypes";
import { getDateObjInReadableFormat } from "../../utils/common";

const BusProviderDetailsModel = ({
  noRows,
  noColumns,
  busOperatorName,
  busOperatorNumber,
  stops,
  recurrences,
}: {
  noRows: number;
  noColumns: number;
  busOperatorName: string;
  busOperatorNumber: number;
  stops: Array<BusStopDetails>;
  recurrences: Array<string>;
}) => {
  return (
    <div>
      <PassengerDetailItemTemplate label="Total Seats">
        <Typography>{noRows * noColumns}</Typography>
      </PassengerDetailItemTemplate>
      <PassengerDetailItemTemplate label="No. Rows">
        <Typography>{noRows}</Typography>
      </PassengerDetailItemTemplate>
      <PassengerDetailItemTemplate label="No. Columns">
        <Typography>{noColumns}</Typography>
      </PassengerDetailItemTemplate>
      <PassengerDetailItemTemplate label="Operator Name">
        <Typography>{busOperatorName}</Typography>
      </PassengerDetailItemTemplate>
      <PassengerDetailItemTemplate label="Operator Number">
        <Typography>{busOperatorNumber}</Typography>
      </PassengerDetailItemTemplate>
      <div className="flex-col">
        <label className="font-bold">Recurrences:</label>
        <div className="flex flex-col md:flex-row md:gap-3 gap-1">
          {recurrences.map((recurrenceItem) => (
            <Typography key={recurrenceItem}>{recurrenceItem}</Typography>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Stops:</label>
        <div className="flex flex-col md:flex-row flex-wrap gap-1">
          {stops?.map((stopItem, stopItemIndex) => (
            <div
              className="bg-gray-200 p-2 flex flex-col gap-2 w-full"
              key={stopItem.stopName}
            >
              <Typography className="font-bold">
                STOP {stopItem.order}
              </Typography>
              <hr />
              <PassengerDetailItemTemplate label="Name" labelMd={6} itemMd={12}>
                <Typography>{stopItem.stopName}</Typography>
              </PassengerDetailItemTemplate>
              <PassengerDetailItemTemplate label="Age" labelMd={6} itemMd={12}>
                <Typography>
                  {getDateObjInReadableFormat(stopItem.time)}
                </Typography>
              </PassengerDetailItemTemplate>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusProviderDetailsModel;
