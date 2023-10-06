import { Button } from "antd";
import { Link } from "react-router-dom";
import { appServices } from "../../reducers/App/AppSlice";
import { useAppDispatch } from "../../stateStore";
import OButton from "../OButton";
import { hoverPrimaryColor, primaryColor } from "../../utils/common";
import DesktopDropdown from "./DesktopDropdown";

const BusProviderButtons = ({
  menuToggled = false,
}: {
  menuToggled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  return (
    <ul
      className={`list-none ${menuToggled ? "" : "hidden"} sm:flex ${
        menuToggled ? "flex-col" : "flex-row"
      } gap-10`}
    >
      <li>
        <Link to="/addbus">
          <Button
            className={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
            style={{ color: "white" }}
          >
            Add New Bus
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/mybuses">
          <Button
            className={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
            style={{ color: "white" }}
          >
            My Buses
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/mybookings">
          <Button
            className={`${
              menuToggled ? "bg-blue-500" : primaryColor
            }  font-bold ${hoverPrimaryColor}`}
            style={{ color: "white" }}
          >
            My Bookings
          </Button>
        </Link>
      </li>
      <li>
        {menuToggled && (
          <OButton
            text="Sign Out"
            buttonClassName={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
            clickHandler={async (e) => {
              e.preventDefault();
              await dispatch(appServices.signoutThunk());
              window.location.reload();
            }}
          />
        )}
        {!menuToggled && <DesktopDropdown />}
      </li>
    </ul>
  );
};

export default BusProviderButtons;
