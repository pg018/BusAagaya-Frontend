import { Col, DatePicker, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import OInput from "../../../../components/OInput";
import OLocationSelect from "../../../../components/OLocationSelect";
import { BusStopDTO } from "../../../../types/Bus/BusTypes";
import OButton from "../../../../components/OButton";
import { dateFormat, timeFormat } from "../../../../utils/common";

const StopTemplate = ({
  busStop,
  deleteButtonHandler,
  stopDataUpdateHandler,
}: {
  busStop: BusStopDTO;
  deleteButtonHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    currOrder: number
  ) => void;
  stopDataUpdateHandler: (finalData: BusStopDTO) => void;
}) => {
  const stopNameChangeHandler = (value: string) => {
    const newObj: BusStopDTO = { ...busStop };
    newObj.stopName = value;
    stopDataUpdateHandler(newObj);
  };
  const costChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj: BusStopDTO = { ...busStop };
    newObj.cost = e.target.value;
    stopDataUpdateHandler(newObj);
  };
  const dayChangeHandler = (date: Dayjs | null) => {
    if (date) {
      const newObj: BusStopDTO = { ...busStop };
      newObj.day = dayjs(date).format(dateFormat);
      stopDataUpdateHandler(newObj);
    }
  };
  const timeChangeHandler = (time: Dayjs | null) => {
    if (time) {
      const newObj: BusStopDTO = { ...busStop };
      newObj.time = time.format("HH:mm");
      stopDataUpdateHandler(newObj);
    }
  };

  return (
    <div className="relative">
      <OButton
        text="X"
        clickHandler={(e) => {
          deleteButtonHandler(e, busStop.order);
        }}
        buttonClassName="absolute top-[-50%] right-[-2.5%] bg-red-500 flex items-center h-5"
      />
      <div className="flex flex-col md:flex-row md:flex-nowrap flex-wrap justify-between">
        <div>
          <label className="font-bold">Stop Name</label>
          <br />
          <OLocationSelect
            changeHandler={stopNameChangeHandler}
            placeholder="Stop Name"
            value={busStop.stopName === "" ? undefined : busStop.stopName}
          />
        </div>
        <Col xs={24} md={5}>
          <OInput
            label="Cost From Start Location"
            type="number"
            value={busStop.cost}
            changeHandler={costChangeHandler}
          />
        </Col>
        <div>
          <label className="font-bold">Day</label>
          <br />
          <DatePicker
            showToday={false}
            format={dateFormat}
            showHour={true}
            showMinute={true}
            showSecond={false}
            value={busStop.day === "" ? null : dayjs(busStop.day)}
            onChange={dayChangeHandler}
            disabledDate={(curr) => {
              return curr && curr < dayjs().startOf("day");
            }}
          />
        </div>
        <div>
          <label className="font-bold">Time</label>
          <br />
          <TimePicker
            format={timeFormat}
            showNow={false}
            showSecond={false}
            value={busStop.time === "" ? null : dayjs(busStop.time, timeFormat)}
            onChange={timeChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default StopTemplate;
