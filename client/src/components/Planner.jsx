import React from "react";
import Weekday from "./Weekday";

const Planner = () => {
  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left">
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
