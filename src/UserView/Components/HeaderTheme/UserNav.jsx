import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotifyModal from "../../../HOC/NotifyModal";
import { localServ } from "../../../services/localServ";
import { removeUserInfo } from "../../redux/slices/userSlice";

export default function UserNav() {
  let [isNotifyModalOpen, setNotifyModalOpen] = useState(false);

  let dispatch = useDispatch();
  let user = useSelector((state) => state.userSlice.user);

  let handleLogOut = () => {
    localServ.user.remove();
    dispatch(removeUserInfo());
    setNotifyModalOpen(false);
    message.success("Đăng xuất thành công", 2);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  let renderContent = () => {
    if (user) {
      return (
        <div className="flex flex-col justify-center text-center">
          <NavLink to="/login">
            <span className="text-white text-lg">
              Xin chào{" "}
              <span className="font-bold text-xl text-red-500">
                {user.hoTen}
              </span>
            </span>
          </NavLink>
          <button
            type="button"
            className="px-4 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg hover:border-gray-600 focus:ring-4 focus:ring-gray-700 focus:outline-none font-medium text-sm text-white"
            onClick={() => {
              setNotifyModalOpen(true);
            }}
          >
            Đăng xuất
          </button>
        </div>
      );
    }
    return (
      <>
        <NavLink to="/login">
          <button
            type="button"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-sm text-white"
          >
            Đăng nhập
          </button>
        </NavLink>
      </>
    );
  };
  return (
    <>
      {renderContent()}
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleCancelClick={() => {
          setNotifyModalOpen(false);
        }}
        handleOKClick={handleLogOut}
      >
        Bạn có muốn đăng xuất?
      </NotifyModal>
    </>
  );
}
