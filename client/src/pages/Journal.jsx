import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { GridLayout } from "../components/index";
import { AddEntry } from "../components/entry/index";
import { Navbar } from "../components/nav/index";
import Auth from "../utils/auth";
import UpdateContext from "../components/UpdateContext";
import { ADD_PLANNERITEM } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
const Journal = () => {
  const [update, setUpdate] = useState(0); // State for forcing update

  const forceRerender = () => {
    setUpdate((prev) => prev + 1); // Update the state to force rerender
  };

  const refetchData = () => {
    refetch();
  };

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();
  let id = window.location.href.split("/")[3];

  let { loading, error, data, refetch } = useQuery(QUERY_USER);
  const userData = data;

  if (loading) return "Loading...";
  if (error) {
    console.log(error);
    window.location.replace("/login");
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
      <UpdateContext.Provider value={{ update, setUpdate, forceRerender }}>
        <div className="grid grid-flow-row content-center">
          <Navbar
            allSpreads={userData.user.spreads}
            currentSpread={currentSpread}
            className="align-center"
          />
          <div>
            <GridLayout
              allSpreads={userData.user.spreads}
              currentSpread={currentSpread}
              spread={userData.user.spreads.slice(-1)[0]}
              userCollections={userData.user.collections}
              userId={userData._id}
              refetchData={refetchData}
            />
          </div>
          <div className="fixed bottom-0 right-4 h-20 w-20">
            <AddEntry
              userCollections={userData.user.collections}
              spreadCollections={currentSpread.weeklyCollections}
              hidePlusLabel={false}
              refetchData={refetchData}
            ></AddEntry>
          </div>
        </div>
      </UpdateContext.Provider>
    );
  }
};

export default Journal;
