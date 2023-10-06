import { useState } from "react";

const usePassword = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordVisibleChangeHandler = (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.preventDefault()
    setPasswordVisible(!passwordVisible);
  };

  return {
    password,
    setPassword,
    passwordChangeHandler,
    passwordVisibleChangeHandler,
    passwordVisible,
  };
};

export default usePassword;
