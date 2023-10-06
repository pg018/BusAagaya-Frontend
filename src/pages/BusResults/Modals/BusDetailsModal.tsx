import { Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { IncomingBusQueryResults } from "../../../types/App/AppTypes";
import { getDateObjInReadableFormat } from "../../../utils/common";
import { BusStopDetails } from "../../../types/Bus/BusTypes";

const BusDetailsModal = ({
  busOperatorName,
  busOperatorNumber,
  startTime,
  showNoSeats = true,
  noRows = 1,
  noColumns = 1,
  showStops = true,
  startLocation,
  stops = [],
}: {
  busOperatorName: string;
  busOperatorNumber: number;
  startTime: string;
  showNoSeats?: boolean;
  noRows?: number;
  noColumns?: number;
  showStops?: boolean;
  startLocation?: string;
  stops?: Array<BusStopDetails>;
}) => {
  return (
    <div className="flex flex-col justify-start">
      <Row>
        <Col xs={24} md={9}>
          <label className="font-bold">Operator Name: &nbsp;</label>
        </Col>
        <Col xs={24} md={15}>
          <Typography>{busOperatorName}</Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={9}>
          <label className="font-bold">Operator Number: &nbsp;</label>
        </Col>
        <Col xs={24} md={15}>
          <Typography>{busOperatorNumber}</Typography>
        </Col>
      </Row>
      {showNoSeats && (
        <Row>
          <Col xs={24} md={9}>
            <label className="font-bold">Total Seats: &nbsp;</label>
          </Col>
          <Col xs={24} md={15}>
            <Typography>{noRows * noColumns}</Typography>
          </Col>
        </Row>
      )}
      {/* Stops */}
      {showStops && (
        <div className="flex flex-col">
          <label className="font-bold">Stops: &nbsp;</label>
          <Row>
            <Col xs={24} md={9}>
              <Typography className="font-bold">{startLocation}</Typography>
            </Col>
            <Col xs={24} md={15}>
              <Typography>{getDateObjInReadableFormat(startTime)}</Typography>
            </Col>
          </Row>
          {stops?.map((busStop) => (
            <Row key={busStop.order}>
              <Col xs={24} md={9}>
                <Typography className="font-bold">
                  {busStop.stopName}
                </Typography>
              </Col>
              <Col xs={24} md={15}>
                <Typography>
                  {getDateObjInReadableFormat(busStop.time)}
                </Typography>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusDetailsModal;
