import { Col } from "antd";
import OInput from "../../../components/OInput";
import AddBusInputTemplate from "../AddBusInputTemplate";

const BusOperatorDetails = ({
  operatorName,
  setOperatorName,
  operatorNumber,
  setOperatorNumber,
}: {
  operatorName: string;
  setOperatorName: React.Dispatch<React.SetStateAction<string>>;
  operatorNumber: string;
  setOperatorNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const operatorNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOperatorName(e.target.value);
  };
  const operatorNumberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOperatorNumber(e.target.value);
  };
  return (
    <AddBusInputTemplate title="Bus Operator Details">
      <Col xs={24} md={5}>
        <OInput
          label="Operator Name"
          type="text"
          value={operatorName}
          changeHandler={operatorNameChangeHandler}
        />
      </Col>
      <Col xs={24} md={5}>
        <OInput
          label="Operator Number"
          type="tel"
          value={operatorNumber}
          changeHandler={operatorNumberChangeHandler}
          inputClassName="w-41"
          addOnBefore="+91"
        />
      </Col>
    </AddBusInputTemplate>
  );
};

export default BusOperatorDetails;
