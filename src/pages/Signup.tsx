import { Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import OCard from "../components/OCard";
import { useEffect, useMemo, useState } from "react";
import OInput from "../components/OInput";
import usePassword from "../hooks/usePassword";
import OPasswordInput from "../components/OPasswordInput";
import { emailValidationRegex, numberOnlyRegex } from "../utils/common";
import { CheckOutlined } from "@ant-design/icons";
import { OutgoingSignUpDetails, UserType } from "../types/App/AppTypes";
import { appServices } from "../reducers/App/AppSlice";
import { useAppDispatch, useTypedSelector } from "../stateStore";
import OButton from "../components/OButton";
import CustomLayout from "../Wrappers/CustomLayout";

const Signup = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const incomingError = useTypedSelector((state) => state.appReducer.error);
  const [messageApi, contextHolder] = message.useMessage();
  const [displayName, setDisplayName] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [isBtnEnabled, setBtnEnabled] = useState<boolean>(false);
  const {
    password: confirmPassword,
    passwordChangeHandler: confirmPasswordChangeHandler,
    passwordVisible: confirmPasswordVisible,
    passwordVisibleChangeHandler: cPasswordVisibleChangeHandler,
  } = usePassword();

  const displayNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const mobileNumberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMobileNumber(e.target.value);
  };
  const accountTypeChangeHandler = (value: string) => {
    setAccountType(value);
  };

  // returns true if all conditions of validation is satisfied
  const nameValidation = useMemo(() => {
    return displayName.trim().length >= 3;
  }, [displayName]);
  const emailValidation = useMemo(() => {
    return emailValidationRegex.test(emailId) && emailId.trim().length > 0;
  }, [emailId]);
  const passwordValidation = useMemo(() => {
    return password.trim().length > 8;
  }, [password]);
  const confirmPasswordValidation = useMemo(() => {
    return confirmPassword === password && confirmPassword.trim().length > 0;
  }, [confirmPassword, password]);
  const mobileNumberValidation = useMemo(() => {
    return (
      numberOnlyRegex.test(mobileNumber) && mobileNumber.trim().length === 10
    );
  }, [mobileNumber]);
  const accountTypeValidation = useMemo(() => {
    return accountType !== "";
  }, [accountType]);

  // button is enabled if all validation conditions are satisfied
  useEffect(() => {
    if (
      nameValidation &&
      emailValidation &&
      passwordValidation &&
      confirmPasswordValidation &&
      mobileNumberValidation &&
      accountTypeValidation
    ) {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  }, [
    nameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
    mobileNumberValidation,
    accountTypeValidation,
  ]);

  // return green tick if the condition is satisfied
  const showLabelTickIndicator = (condition: boolean) => {
    return condition ? <CheckOutlined style={{ color: "green" }} /> : undefined;
  };

  // function for handling the sign up button
  const signupButtonClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const finalData: OutgoingSignUpDetails = {
      displayName: displayName.trim(),
      emailId: emailId.trim(),
      password,
      confirmPassword,
      mobileNumber: +mobileNumber,
      type: accountType,
    };
    setBtnEnabled(false);
    const result = await dispatch(appServices.signupThunk(finalData));
    if (appServices.signupThunk.fulfilled.match(result)) {
      messageApi.open({
        type: "success",
        content: "Account Created Successfully",
      });
      setTimeout(() => {
        history("/signin", { replace: true });
      }, 1500);
    } else if (appServices.signupThunk.rejected.match(result)) {
      messageApi.error(incomingError.errorMessage, 2000);
    }
    setBtnEnabled(true);
  };

  return (
    <>
      {contextHolder}
      <CustomLayout minHeight="100vh">
        <div className="flex flex-col items-center">
          <OCard cardClassName="text-start top-20" cardTitle="Sign Up">
            <form className="flex flex-col gap-2">
              <OInput
                label="Name"
                type="text"
                value={displayName}
                adjLabelIcon={showLabelTickIndicator(nameValidation)}
                changeHandler={displayNameChangeHandler}
              />
              <OInput
                label="Email"
                type="email"
                value={emailId}
                adjLabelIcon={showLabelTickIndicator(emailValidation)}
                changeHandler={emailChangeHandler}
              />
              <div>
                <label className="font-bold">
                  Password {showLabelTickIndicator(passwordValidation)}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                />
              </div>
              <div>
                <label className="font-bold">
                  Confirm Password{" "}
                  {showLabelTickIndicator(confirmPasswordValidation)}
                </label>
                <OPasswordInput
                  password={confirmPassword}
                  passwordChangeHandler={confirmPasswordChangeHandler}
                  passwordVisible={confirmPasswordVisible}
                  passwordVisibleChangeHandler={cPasswordVisibleChangeHandler}
                />
              </div>
              <OInput
                label="Mobile Number"
                type="tel"
                adjLabelIcon={showLabelTickIndicator(mobileNumberValidation)}
                value={mobileNumber}
                changeHandler={mobileNumberChangeHandler}
                addOnBefore={"+91"}
              />
              <div>
                <label className="font-bold">
                  Account Type {showLabelTickIndicator(accountTypeValidation)}
                </label>
                <br />
                <Select
                  className="w-full"
                  onChange={accountTypeChangeHandler}
                  value={accountType}
                  options={[
                    {
                      value: "",
                      label: "Select Account Type",
                    },
                    {
                      value: UserType.user,
                      label: "User",
                    },
                    { value: UserType.busoffice, label: "Bus Provider" },
                  ]}
                />
              </div>
              <OButton
                text="Sign Up"
                disabled={!isBtnEnabled}
                clickHandler={signupButtonClickHandler}
              />
            </form>
            <div className="flex flex-col items-center mt-2">
              <Link to="/signin" className="font-bold">
                Already a User? Sign In!
              </Link>
            </div>
          </OCard>
        </div>
      </CustomLayout>
    </>
  );
};

export default Signup;
