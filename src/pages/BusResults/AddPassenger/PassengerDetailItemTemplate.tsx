import { Row, Col } from "antd";

const PassengerDetailItemTemplate = ({
  children,
  labelMd = 9,
  itemMd = 10,
  label,
}: {
  labelMd?: number;
  itemMd?: number;
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <Row>
      <Col xs={24} md={labelMd}>
        <label className="font-bold">{label}:&nbsp;</label>
      </Col>
      <Col xs={24} md={itemMd}>
        {children}
      </Col>
    </Row>
  );
};

export default PassengerDetailItemTemplate;
