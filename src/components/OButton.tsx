import { Button } from "antd";
import {
  disabledPrimaryColor,
  hoverPrimaryColor,
  primaryColor,
} from "../utils/common";

const OButton = ({
  clickHandler,
  text,
  disabled = false,
  buttonClassName,
}: {
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
  buttonClassName?: string;
}) => {
  return (
    <Button
      className={`${primaryColor} ${hoverPrimaryColor} ${disabledPrimaryColor} font-bold ${buttonClassName}`}
      style={{ color: "white" }}
      onClick={clickHandler}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default OButton;
