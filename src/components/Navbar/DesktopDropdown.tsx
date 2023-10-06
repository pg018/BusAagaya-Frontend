import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { appServices } from "../../reducers/App/AppSlice";
import { useAppDispatch, useTypedSelector } from "../../stateStore";

const DesktopDropdown = () => {
  const dispatch = useAppDispatch();
  const userData = useTypedSelector((state) => state.appReducer.userData);
  return (
    <Dropdown
      menu={{
        items: [
          { label: "Settings", key: 1 },
          { label: "Sign Out", key: 2 },
        ],
        onClick: async ({ key }) => {
          if (+key === 2) {
            await dispatch(appServices.signoutThunk());
            window.location.href = "/";
          }
        },
      }}
    >
      <div className="cursor-pointer mt-1">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Hi, {userData.displayName}
          <DownOutlined style={{ fontSize: "12px", fontWeight: "bold" }} />
        </a>
      </div>
    </Dropdown>
  );
};

export default DesktopDropdown;
