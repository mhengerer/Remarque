import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_DATE, QUERY_SPREAD, QUERY_USER } from "../utils/queries";
import { useEffect } from "react";

const Journal = () => {
  const [currentSpread, setCurrentSpread] = useState({});
  const [allSpreads, setAllSpreads] = useState({});

  // Generates the user ID and a list of all their spreads
  const useUserData = async () => {
    const { loading, data } = await useQuery(QUERY_USER);
    return data;
  };

  const userData = useUserData().then((data) => {
    const allSpreads = data.user.spreads;
    console.log(allSpreads);
    setAllSpreads(allSpreads);
    setCurrentSpread(allSpreads.slice(-1)[0]);
    return data.user;
  });

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();

  if (userData)
    return (
      <div className="grid grid-flow-row">
        <Navbar allSpreads={{ allSpreads }} />
        <div className="w-full text-left">
          <GridLayout currentSpread={{ currentSpread }} />
        </div>

        <div className="sticky bottom-0 left-70 h-20 w-20">
          <InfoModal />
        </div>

        <button></button>
      </div>
    );
};

export default Journal;
