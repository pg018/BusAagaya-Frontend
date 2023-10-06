import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  hoverPrimaryColor,
  primaryColor,
} from "../../utils/common";

const SignInUpButtons = ({
  menuToggled = false,
}: {
  menuToggled?: boolean;
}) => {
  return (
    <ul
      className={`list-none ${menuToggled ? "" : "hidden"} sm:flex ${
        menuToggled ? "flex-col" : "flex-row"
      } gap-10`}
    >
      <li>
        <Link to="/signin">
          <Button
            className={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
            style={{ color: "white" }}
          >
            Sign In
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/signup">
          <Button
            className={`${
              menuToggled ? "bg-blue-500" : primaryColor
            } ${hoverPrimaryColor} font-bold`}
            style={{ color: "white" }}
          >
            Sign Up
          </Button>
        </Link>
      </li>
    </ul>
  );
};

export default SignInUpButtons;
