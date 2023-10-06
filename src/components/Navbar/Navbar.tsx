import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { initialUserData } from "../../reducers/App/AppConstantData";
import { UserType } from "../../types/App/AppTypes";
import { useTypedSelector } from "../../stateStore";
import SignInUpButtons from "./SignInUpButtons";
import BusProviderButtons from "./BusProviderButtons";
import UserButtons from "./UserButtons";
import { useState } from "react";
import { primaryColor } from "../../utils/common";

const Navbar = () => {
  const userData = useTypedSelector((state) => state.appReducer.userData);
  const [isMenuToggled, setMenuToggled] = useState<boolean>(false);

  const menuButtonToggleHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setMenuToggled(true);
  };

  const closeMenuButtonHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setMenuToggled(false);
  };

  return (
    <nav className="w-full flex items-center fixed py-3 mt-3 h-16 z-20">
      <div className="w-full flex justify-between items-center max-w-5xl mx-auto bg-[#f5f5dc] p-3 rounded">
        <Link to="/">
          <Title
            className="mt-1 ms-3"
            level={4}
            style={{ color: "rgb(249 115 22)" }}
          >
            BusAagaya
          </Title>
        </Link>
        {/* Desktop Application */}
        {userData.id === initialUserData.id && <SignInUpButtons />}
        {userData.id !== initialUserData.id &&
          userData.type === UserType.busoffice && <BusProviderButtons />}
        {userData.id !== initialUserData.id &&
          userData.type === UserType.user && <UserButtons />}

        {/*Mobile Application */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          {!isMenuToggled && (
            <MenuOutlined onClick={menuButtonToggleHandler}></MenuOutlined>
          )}
          {isMenuToggled && <CloseOutlined onClick={closeMenuButtonHandler} />}
          <div
            className={`${
              isMenuToggled ? "flex" : "hidden"
            } p-6 absolute top-20 ${primaryColor} rounded-xl`}
          >
            {userData.id === initialUserData.id && (
              <SignInUpButtons menuToggled={true} />
            )}
            {userData.id !== initialUserData.id &&
              userData.type === UserType.busoffice && (
                <BusProviderButtons menuToggled={true} />
              )}
            {userData.id !== initialUserData.id &&
              userData.type === UserType.user && (
                <UserButtons menuToggled={true} />
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
