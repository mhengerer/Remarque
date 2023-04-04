import React, { useEffect, useState } from "react";
import Weekday from "../Weekday";

const Planner = ({ plannerItems }) => {
  const plannerArray = plannerItems;
  return (
    <div className="w-full text-white grid grid-cols-1 grid-flow-row text-left">
      {plannerArray.map((item) => (
        <Weekday
          id={item._id}
          key={item._id}
          body={item.body}
          weekday={item.dayOfCurrentWeek}
        />
      ))}
    </div>
  );
};

export default Planner;
