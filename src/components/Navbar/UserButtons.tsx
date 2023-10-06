import { Link } from "react-router-dom";
import { useAppDispatch } from "../../stateStore";
import { appServices } from "../../reducers/App/AppSlice";
import OButton from "../OButton";
import { hoverPrimaryColor, primaryColor } from "../../utils/common";
import DesktopDropdown from "./DesktopDropdown";

const UserButtons = ({ menuToggled = false }: { menuToggled?: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <ul
      className={`list-none ${menuToggled ? "" : "hidden"} sm:flex ${
        menuToggled ? "flex-col" : "flex-row"
      } gap-10`}
    >
      <li>
        <Link to="/mybookings">
          <OButton
            text="My Bookings"
            buttonClassName={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
          />
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

export default UserButtons;
