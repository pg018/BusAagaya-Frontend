import { useMemo, useState } from "react";
import { DatePicker, message } from "antd";
import Title from "antd/es/typography/Title";
import busImage from "../../assets/busImg.png";
import Navbar from "../../components/Navbar/Navbar";
import TrendingOfferCard from "./TrendingOfferCard";
import { TrendingDataList } from "./TrendingOfferData";
import OLocationSelect from "../../components/OLocationSelect";
import dayjs, { Dayjs } from "dayjs";
import OButton from "../../components/OButton";
import CustomLayout from "../../Wrappers/CustomLayout";

const Home = (): JSX.Element => {
  const [messageApi, contextHolder] = message.useMessage();
  const [startLocation, setStartLocation] = useState<string>("");
  const [endLocation, setEndLocation] = useState<string>("");
  const [travelDate, setTravelDate] = useState<string>("");

  const startLocationChangeHandler = (value: string) => {
    setStartLocation(value);
  };
  const endLocationChangeHandler = (value: string) => {
    setEndLocation(value);
  };
  const travelDateChangeHandler = (date: Dayjs | null) => {
    if (date) {
      // converting the date to start of day and converting to utc format
      setTravelDate(dayjs(date).startOf("day").toISOString());
    }
  };

  // returns true if the validation is successfull
  const startLocationValidation = useMemo(() => {
    return startLocation !== "";
  }, [startLocation]);
  const endLocationValidation = useMemo(() => {
    return endLocation !== "";
  }, [endLocation]);
  const travelDateValidation = useMemo(() => {
    return travelDate !== "";
  }, [travelDate]);

  // function of the search button functionality
  const searchBusButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      endLocation === startLocation &&
      startLocationValidation &&
      endLocationValidation
    ) {
      // if the start and end location is the same
      messageApi.open({
        type: "error",
        content: "End Location and Start Location cannot be same",
      });
      setStartLocation("");
      setEndLocation("");
      return;
    }
    if (
      startLocationValidation &&
      endLocationValidation &&
      travelDateValidation
    ) {
      // redirecting to results page
      window.location.href = `/busresults?startLocation=${startLocation}&endLocation=${endLocation}&travelDate=${travelDate}`;
    } else {
      // if any detail is missing
      messageApi.open({
        type: "error",
        content: "Please enter all details",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <CustomLayout minHeight="50vh">
        <div className="absolute inset-0 opacity-1">
          <img
            src={busImage}
            className="w-full h-full object-cover"
            alt="Buses"
          />
        </div>
        <Navbar />
        <div
          className="absolute inset-x-0 mx-auto bg-[#f5f5dc] p-4 max-w-3xl rounded md:top-3/4"
          style={{ top: "90%" }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center mx-auto md:gap-10 md:ms-4">
            <OLocationSelect
              placeholder="Start Location"
              changeHandler={startLocationChangeHandler}
              value={startLocation === "" ? undefined : startLocation}
            />
            <OLocationSelect
              placeholder="End Location"
              changeHandler={endLocationChangeHandler}
              value={endLocation === "" ? undefined : endLocation}
            />
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
              className="font-bold placeholder-gray-400"
              placeholder="Travel Date"
              onChange={travelDateChangeHandler}
            />
            <OButton text="Search Bus" clickHandler={searchBusButtonHandler} />
          </div>
        </div>
      </CustomLayout>
      <div className="mt-48 md:mt-20">
        <div className="flex flex-col rounded p-3 bg-[#f5f5dc] max-w-7xl mx-auto">
          <Title level={3}>TRENDING OFFERS</Title>
          <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center gap-2">
            {TrendingDataList.map((dataItem, dataItemIndex) => (
              // generally comes from backend but here just for ui
              <TrendingOfferCard
                key={dataItemIndex}
                imgUrl={dataItem.imgUrl}
                cardClassName={`home-page-trending-${dataItemIndex + 1}-offer`}
                textContent={dataItem.textContent}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
