import React, { useState } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";

const Journal = () => {
  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();
  return (
    <div className="grid grid-flow-row">
      <Navbar />
      <div className="w-full  text-left">
        <GridLayout />
      </div>

      <div className="sticky bottom-0 left-70 h-20 w-20">
        <InfoModal />
      </div>

      <button></button>
    </div>
  );
};

export default Journal;
