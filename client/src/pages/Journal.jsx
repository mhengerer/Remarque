import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_DATE, QUERY_SPREAD, QUERY_USER } from "../utils/queries";

const Journal = (props) => {
  const [currentSpread, setCurrentSpread] = useState({});
  const [allSpreads, setAllSpreads] = useState({});

  const { loading, error, data } = useQuery(QUERY_USER);
  const userData = data;
  console.log(loading);
  if (loading) return "Loading...";
  if (error) return "Error";

  if (!loading) {
    // setAllSpreads();
    // setCurrentSpread(data.user.spreads.slice(-1)[0]);

    const checkLoggedIn = () => {
      if (!Auth.loggedIn()) {
        window.location.replace("/login");
      }
    };
    checkLoggedIn();

    return (
      <div className="grid grid-flow-row">
        <Navbar allSpreads={userData.user.spreads} />
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
