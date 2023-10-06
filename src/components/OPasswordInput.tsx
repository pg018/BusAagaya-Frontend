import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";

const OPasswordInput = ({
  password,
  passwordVisible,
  passwordChangeHandler,
  passwordVisibleChangeHandler,
}: {
  password: string;
  passwordVisible: boolean;
  passwordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordVisibleChangeHandler: (e: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  return (
    <Input
      type={`${passwordVisible ? "text" : "password"}`}
      value={password}
      onChange={passwordChangeHandler}
      addonAfter={
        passwordVisible ? (
          <EyeOutlined
            onClick={passwordVisibleChangeHandler}
            className="cursor-pointer"
          />
        ) : (
          <EyeInvisibleOutlined
            onClick={passwordVisibleChangeHandler}
            className="cursor-pointer"
          />
        )
      }
    />
  );
};

export default OPasswordInput;
