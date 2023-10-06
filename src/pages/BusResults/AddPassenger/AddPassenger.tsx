import { Input, Select } from "antd";
import OButton from "../../../components/OButton";
import { useEffect, useMemo, useState } from "react";
import { numberOnlyRegex } from "../../../utils/common";
import { PassengerItem } from "../../../types/Bus/BusTypes";
import PassengerDetailItemTemplate from "./PassengerDetailItemTemplate";

const { Option } = Select;

const AddPassenger = ({
  availableSeats,
  addButtonHandler,
}: {
  availableSeats: Array<string>;
  addButtonHandler: (passengerDetails: PassengerItem) => void;
}) => {
  const [passengerName, setPassengerName] = useState<string>("");
  const [passengerGender, setPassengerGender] = useState<string>("");
  const [seatNumber, setSeatNumber] = useState<string>("");
  const [passengerAge, setPassengerAge] = useState<string>("");
  const [isAddBtnEnabled, setAddBtnEnabled] = useState<boolean>(false);

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassengerName(e.target.value);
  };
  const genderChangeHandler = (value: string) => {
    setPassengerGender(value);
  };
  const seatNumberChangeHandler = (value: string) => {
    setSeatNumber(value);
  };
  const ageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassengerAge(e.target.value);
  };

  // returns true if the validations are correct
  const nameValidation = useMemo(() => {
    return passengerName.trim().length >= 3;
  }, [passengerName]);
  const genderValidation = useMemo(() => {
    return passengerGender.trim().length > 0;
  }, [passengerGender]);
  const ageValidation = useMemo(() => {
    return numberOnlyRegex.test(passengerAge) && passengerAge.trim().length > 0;
  }, [passengerAge]);
  const seatValidation = useMemo(() => {
    return seatNumber.trim().length > 0;
  }, [seatNumber]);

  // after passenger selects seat and adds, we get new available seats
  const availableSeatsList = useMemo(() => {
    return availableSeats;
  }, [availableSeats]);

  // add passenger button is enabled if all validations are satisfied
  useEffect(() => {
    if (nameValidation && genderValidation && ageValidation && seatValidation) {
      setAddBtnEnabled(true);
    } else {
      setAddBtnEnabled(false);
    }
  }, [nameValidation, ageValidation, genderValidation, seatValidation]);

  // add passenger button handler
  const addPassengerButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const finalData: PassengerItem = {
      passengerName,
      passengerAge: +passengerAge,
      passengerGender,
      seatNumber,
    };
    addButtonHandler(finalData);
    setPassengerName("");
    setPassengerAge("");
    setPassengerGender("");
    setSeatNumber("");
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <PassengerDetailItemTemplate label="Passenger Name">
          <Input
            type="text"
            value={passengerName}
            onChange={nameChangeHandler}
          />
        </PassengerDetailItemTemplate>
        <PassengerDetailItemTemplate label="Passenger Age">
          <Input
            type="number"
            value={passengerAge}
            onChange={ageChangeHandler}
          />
        </PassengerDetailItemTemplate>
        <PassengerDetailItemTemplate label="Passenger Gender">
          <Select
            className="w-full"
            placeholder="Select Gender"
            onChange={genderChangeHandler}
            value={passengerGender === "" ? null : passengerGender}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </PassengerDetailItemTemplate>
        <PassengerDetailItemTemplate label="Seat Number">
          <Select
            className="w-full"
            value={seatNumber === "" ? null : seatNumber}
            onChange={seatNumberChangeHandler}
            placeholder="Seat Number"
          >
            {availableSeatsList.map((seatNumber) => (
              <Option key={seatNumber} value={seatNumber}>
                {seatNumber}
              </Option>
            ))}
          </Select>
        </PassengerDetailItemTemplate>
      </div>
      <div className="flex flex-row justify-end mt-2">
        <OButton
          text="Add Passenger"
          disabled={!isAddBtnEnabled}
          clickHandler={addPassengerButtonHandler}
        />
      </div>
    </div>
  );
};

export default AddPassenger;
