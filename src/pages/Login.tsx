import { useEffect, useMemo, useState } from "react";
import { Input, message } from "antd";
import OCard from "../components/OCard";
import usePassword from "../hooks/usePassword";
import OPasswordInput from "../components/OPasswordInput";
import { Link } from "react-router-dom";
import { emailValidationRegex } from "../utils/common";
import { OutgoingSignInDetails } from "../types/App/AppTypes";
import { useAppDispatch, useTypedSelector } from "../stateStore";
import { appServices } from "../reducers/App/AppSlice";
import OButton from "../components/OButton";
import CustomLayout from "../Wrappers/CustomLayout";

const Login = () => {
  const dispatch = useAppDispatch();
  const incomingError = useTypedSelector((state) => state.appReducer.error);
  const [messageApi, messageContext] = message.useMessage();
  const [emailId, setEmailId] = useState<string>("");
  const {
    password,
    passwordChangeHandler,
    passwordVisible,
    passwordVisibleChangeHandler,
  } = usePassword();
  const [isBtnEnabled, setBtnEnabled] = useState<boolean>(false);

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  // returns true if all validation conditions are satisfied
  const emailValidation = useMemo(() => {
    return emailId.trim().length > 0 && emailValidationRegex.test(emailId);
  }, [emailId]);
  const passwordValidation = useMemo(() => {
    return password.trim().length > 8;
  }, [password]);

  // if all validation is satisfied, only then button is enabled
  useEffect(() => {
    if (emailValidation && passwordValidation) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  }, [emailValidation, passwordValidation]);

  // function for handling the login button
  const loginButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const finalData: OutgoingSignInDetails = {
      emailId: emailId.trim(),
      password: password,
    };
    setBtnEnabled(false);
    const result = await dispatch(appServices.signinThunk(finalData));
    if (appServices.signinThunk.fulfilled.match(result)) {
      // if succeeded
      window.location.href = "/";
    } else if (appServices.signinThunk.rejected.match(result)) {
      // if failed
      messageApi.error(incomingError.errorMessage, 2000);
    }
    setBtnEnabled(true);
  };

  return (
    <>
      {messageContext}
      <CustomLayout minHeight="100vh">
        <div className="flex flex-col items-center">
          <OCard cardClassName="text-start top-40" cardTitle="Sign In">
            <form className="flex flex-col gap-2">
              <div>
                <label className="font-bold">Email ID</label>
                <Input
                  type="email"
                  value={emailId}
                  onChange={emailChangeHandler}
                />
              </div>
              <div>
                <label className="font-bold">Password</label>
                <OPasswordInput
                  password={password}
                  passwordChangeHandler={passwordChangeHandler}
                  passwordVisible={passwordVisible}
                  passwordVisibleChangeHandler={passwordVisibleChangeHandler}
                />
              </div>
              <OButton
                text="Sign In"
                disabled={!isBtnEnabled}
                clickHandler={loginButtonHandler}
              />
            </form>
            <div className="flex flex-col items-center mt-2">
              <Link to="/signup" className="font-bold">
                New User? Sign Up!
              </Link>
            </div>
          </OCard>
        </div>
      </CustomLayout>
    </>
  );
};

export default Login;
