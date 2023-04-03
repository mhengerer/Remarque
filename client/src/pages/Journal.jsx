import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_SPREAD } from "../utils/queries";

const Journal = async (props) => {
  // Set the current spread in the state for use by Components
  const [spread, setSpread] = useState("");
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
    <div
      className="grid grid-flow-row"
      loading={loading}
      error={error}
      data={data}
    >
      <Navbar />
      <div className="w-full text-left">
        <GridLayout data={data} />
      </div>

      <div className="sticky bottom-0 left-70 h-20 w-20">
        <InfoModal />
      </div>

      <button></button>
    </div>
  );
};

export default Journal;
