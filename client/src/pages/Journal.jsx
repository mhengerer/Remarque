import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { ADD_SPREAD } from "../utils/mutations";
import { QUERY_SPREAD, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";

const Journal = () => {
  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();
  let id = window.location.href.split("/")[3];

  const { loading, error, data } = useQuery(QUERY_USER);
  const userData = data;

  if (loading) return "Loading...";
  if (error) {
    return "error";
  }

  if (!loading) {
    let currentSpread = userData.user.spreads.slice(-1)[0];
    if (id) {
      currentSpread = userData.user.spreads.filter((spread) => {
        return spread._id === id;
      });
      currentSpread = currentSpread[0];
    }
    return (
      <div className="grid grid-flow-row">
        <Navbar
          allSpreads={userData.user.spreads}
          currentSpread={currentSpread}
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
