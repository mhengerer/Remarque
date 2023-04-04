import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { ADD_SPREAD } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Journal = (props) => {
  const [addSpread] = useMutation(ADD_SPREAD);

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();

  const { loading, error, data } = useQuery(QUERY_USER);
  let userData = data;
  console.log(loading);
  if (loading) return "Loading...";
  if (error) return "Error";

  if (!loading) {
    if (error || userData === undefined) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0"); // add leading zero if month is less than 10
      const day = today.getDate().toString().padStart(2, "0"); // add leading zero if day is less than 10

      const currentDate = `${year}-${month}-${day}`;

      const userData = addSpread({
        variables: {
          date: currentDate,
        },
      });
      console.log(userData);
    }
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
