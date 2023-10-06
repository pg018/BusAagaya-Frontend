import Title from "antd/es/typography/Title";
import { getDateObjInReadableFormat } from "../../../utils/common";
import DetailItemTemplate from "./DetailItemTemplate";

const BusCardBasicDetails = ({
  busName,
  startLocation,
  endLocation,
  startTime,
  endTime,
}: {
  busName: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
}) => {
  console.log(new Date(startTime).toLocaleString());
  return (
    <>
      <Title level={4}>{busName}</Title>
      <DetailItemTemplate label="From" data={startLocation} />
      <DetailItemTemplate label="To" data={endLocation} />
      <DetailItemTemplate
        label="Start"
        data={getDateObjInReadableFormat(startTime)}
      />
      <DetailItemTemplate
        label="End"
        data={getDateObjInReadableFormat(endTime)}
      />
    </>
  );
};

export default BusCardBasicDetails;
