import { useQuery } from "@apollo/client";
import React from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import {  QUERY_USER } from "../utils/queries";


const Journal = () => {
  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();

  const { loading, error, data } = useQuery(QUERY_USER);
  const userData = data;
  if (loading) return "Loading...";
  if (error) return "Error";

  if (!loading) {

    return (
      <div className="grid grid-flow-row">
        <Navbar
          allSpreads={userData.user.spreads}
          currentSpread={userData.user.spreads.slice(-1)[0]}
        />
        <div className="w-full text-left">
          <GridLayout spread={userData.user.spreads.slice(-1)[0]} />
        </div>

        <div className="sticky bottom-0 left-70 h-20 w-20">
          <InfoModal />
        </div>

        <button></button>
      </div>
    );
  }
};

export default Journal;
