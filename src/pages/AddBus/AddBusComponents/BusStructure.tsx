import { Col, Radio, RadioChangeEvent } from "antd";
import OInput from "../../../components/OInput";
import AddBusInputTemplate from "../AddBusInputTemplate";

const BusStructure = ({
  noRows,
  setNoRows,
  noColumns,
  setNoColumns,
  AfromLeft,
  setAFromLeft,
}: {
  noRows: string;
  setNoRows: React.Dispatch<React.SetStateAction<string>>;
  noColumns: string;
  setNoColumns: React.Dispatch<React.SetStateAction<string>>;
  AfromLeft: boolean;
  setAFromLeft: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const rowsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoRows(e.target.value);
  };
  const columnsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoColumns(e.target.value);
  };
  const aFromLeftChangeHandler = (e: RadioChangeEvent) => {
    setAFromLeft(e.target.value);
  };
  return (
    <AddBusInputTemplate title="Bus Structure">
      <Col xs={24} md={5}>
        <OInput
          label="Number of Rows in Bus (1,2...)"
          type="number"
          value={noRows}
          changeHandler={rowsChangeHandler}
          placeholder="0"
        />
      </Col>
      <Col xs={24} md={5}>
        <OInput
          label="Number of Columns in Bus (A,B..)"
          type="number"
          value={noColumns}
          changeHandler={columnsChangeHandler}
          placeholder="0"
        />
      </Col>
      <Col>
        <label className="font-bold">A from Left</label>
        <br />
        <Radio.Group value={AfromLeft} onChange={aFromLeftChangeHandler}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Col>
    </AddBusInputTemplate>
  );
};

export default BusStructure;
