import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./common/footer";
import Navbar from "./common/navbar";

const UserPannel = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserPannel;
