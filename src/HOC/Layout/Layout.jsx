import React from "react";
import Header from "../../UserView/Components/HeaderTheme/Header";
import { webColor } from "../../UserView/constants/colorConstant";
import NotifyModal from "../NotifyModal";

export default function Layout({ Component }) {
  return (
    <div className="text-white" style={{ background: webColor.bgPrimary }}>
      <Header />
      <Component />
    </div>
  );
}
