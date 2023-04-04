import React, { useEffect, useState } from "react";
import Weekday from "../Weekday";

const Planner = (planner) => {
  const [plannerItems, setPlannerItems] = useState("");

  useEffect(() => {
    if (planner) {
      setPlannerItems(planner);
      console.log(planner);
    }
  }, [planner]);

  return (
    <div className="w-full text-white grid grid-cols-1 grid-flow-row text-left">
      <Weekday />
      <Weekday />
      <Weekday />
      <Weekday />
      <Weekday />
      <div className="w-full grid grid-cols-2 grid-flow-row text-left">
        <Weekday />
        <Weekday />
      </div>
    </div>
  );
};

export default Planner;
