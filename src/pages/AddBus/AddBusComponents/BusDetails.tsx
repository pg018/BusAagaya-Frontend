import { Col, DatePicker, Select, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import OInput from "../../../components/OInput";
import OLocationSelect from "../../../components/OLocationSelect";
import { dateFormat, timeFormat, weekdaysList } from "../../../utils/common";
import AddBusInputTemplate from "../AddBusInputTemplate";
import { DefaultOptionType } from "antd/es/select";
import { useEffect } from "react";

const { Option } = Select;

const BusDetails = ({
  busName,
  setBusName,
  startLocation,
  setStartLocation,
  startLocationDate,
  setStartLocationDate,
  startLocationTime,
  setStartLocationTime,
  recurrenceList,
  setRecurrenceList,
}: {
  busName: string;
  setBusName: React.Dispatch<React.SetStateAction<string>>;
  startLocation: string;
  setStartLocation: React.Dispatch<React.SetStateAction<string>>;
  startLocationDate: string;
  setStartLocationDate: React.Dispatch<React.SetStateAction<string>>;
  startLocationTime: string;
  setStartLocationTime: React.Dispatch<React.SetStateAction<string>>;
  recurrenceList: Array<string>;
  setRecurrenceList: React.Dispatch<React.SetStateAction<Array<string>>>;
}) => {
  const busNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusName(e.target.value);
  };
  const startLocationChangeHandler = (value: string) => {
    setStartLocation(value);
  };
  const startLocationDateChangeHandler = (date: Dayjs | null) => {
    if (date) {
      setStartLocationDate(dayjs(date).format(dateFormat));
    }
  };
  const startLocationTimeChangeHandler = (time: Dayjs | null) => {
    if (time) {
      setStartLocationTime(dayjs(time).format(timeFormat));
    }
  };
  const recurrenceListChangeHandler = (value: string[]) => {
    setRecurrenceList(value);
  };

  useEffect(() => {
    // when start location date is selected, the day on that date must be in recurrence
    if (startLocationDate !== "") {
      const selectedDayName = dayjs(startLocationDate).format("dddd");
      if (!recurrenceList.includes(selectedDayName)) {
        setRecurrenceList([...recurrenceList, selectedDayName]);
      } else {
        setRecurrenceList(recurrenceList);
      }
    }
  }, [startLocationDate, recurrenceList]);

  return (
    <>
      <AddBusInputTemplate title="Bus Details">
        <Col xs={24} md={3}>
          <OInput
            label="Bus Name"
            type="text"
            value={busName}
            changeHandler={busNameChangeHandler}
          />
        </Col>
        <div>
          <label className="font-bold">Start Location</label>
          <br />
          <Col sm={24} md={5}>
            <OLocationSelect
              changeHandler={startLocationChangeHandler}
              value={startLocation === "" ? undefined : startLocation}
              selectClassName="xs:w-full md:w-54"
              placeholder="Start Location"
            />
          </Col>
        </div>
        <div>
          <label className="font-bold">Start Day</label>
          <br />
          <DatePicker
            showToday={false}
            showHour={true}
            showMinute={true}
            value={startLocationDate === "" ? null : dayjs(startLocationDate)}
            onChange={startLocationDateChangeHandler}
            disabledDate={(curr) => {
              return curr && curr < dayjs().startOf("day");
            }}
          />
        </div>
        <div>
          <label className="font-bold">Start Time</label>
          <br />
          <Col>
            <TimePicker
              placeholder="Start Time"
              format="HH:mm"
              value={
                startLocationTime === ""
                  ? null
                  : dayjs(startLocationTime, timeFormat)
              }
              onChange={startLocationTimeChangeHandler}
              showNow={false}
            />
          </Col>
        </div>
      </AddBusInputTemplate>
      <AddBusInputTemplate title="" showTitle={false}>
        <div>
          <label className="font-bold">Recurrence</label>
          <Col xs={24} md={24}>
            <Select
              mode="multiple"
              allowClear
              value={recurrenceList}
              style={{ width: "100%" }}
              onChange={recurrenceListChangeHandler}
            >
              {weekdaysList.map((weekday) => (
                <Option value={weekday} key={weekday}>
                  {weekday}
                </Option>
              ))}
            </Select>
          </Col>
        </div>
      </AddBusInputTemplate>
    </>
  );
};

export default BusDetails;
