import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_DATE, QUERY_SPREAD, QUERY_USER } from "../utils/queries";

const Journal = (props) => {
  // Generates the user ID and a list of all their spreads
  const useUserData = async () => {
    const { loading, error, data } = await useQuery(QUERY_USER);
    return data;
  };
  const useCurrentDate = async () => {
    const { loading, error, data } = await useQuery(QUERY_DATE);
    return data;
  };
  const allSpreads = useUserData().then((data) => console.log(data));
  // Get spreadId from params (needs to be set)
  const { spreadId } = useParams();
  // Query for spread data from id
  const { loading, error, data } = useQuery(QUERY_SPREAD, {
    variables: { spreadId },
  });

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();

  return (
    <div className="grid grid-flow-row">
      <Navbar />
      <div className="w-full text-left">
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
