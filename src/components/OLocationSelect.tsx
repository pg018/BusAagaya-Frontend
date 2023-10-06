import { Select } from "antd";
import { locationList } from "../utils/common";

const { Option } = Select;

const OLocationSelect = ({
  placeholder,
  changeHandler,
  value,
  selectClassName,
}: {
  placeholder?: string;
  changeHandler: (value: string) => void;
  value?: string;
  selectClassName?: string;
}) => {
  return (
    <Select
      placeholder={placeholder}
      className={`font-bold placeholder-gray-400 ${selectClassName}`}
      showSearch
      onChange={changeHandler}
      value={value}
    >
      {locationList.map((location, locationIndex) => (
        <Option value={location} key={locationIndex}>
          {location}
        </Option>
      ))}
    </Select>
  );
};

export default OLocationSelect;
