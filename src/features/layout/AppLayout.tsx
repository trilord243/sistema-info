import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const AppLayout: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default AppLayout;
