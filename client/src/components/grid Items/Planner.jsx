import React, { useEffect, useState } from "react";
import Weekday from "../Weekday";
import Dragger from "./Dragger";

const Planner = (planner) => {

const plannerItemsTest = [
  {
    _id: "642b2bd21630e15cfcc7b2d2",
    body: "Testsdafasgddfasdfasdfsd",
    dayOfCurrentWeek: 0,
  },
  {
    _id: "642b2bd21630e15cfcc7b2d4",
    body: null,
    dayOfCurrentWeek: 1,
  },
  {
    _id: "642b2bd21630e15cfcc7b2d6",
    body: null,
    dayOfCurrentWeek: 2,
  },
  {
    _id: "642b2bd21630e15cfcc7b2d8",
    body: null,
    dayOfCurrentWeek: 3,
  },
  {
    _id: "642b2bd21630e15cfcc7b2da",
    body: null,
    dayOfCurrentWeek: 4,
  },
  {
    _id: "642b2bd21630e15cfcc7b2dc",
    body: null,
    dayOfCurrentWeek: 5,
  },
  {
    _id: "642b2bd21630e15cfcc7b2de",
    body: null,
    dayOfCurrentWeek: 6,
  },
];
const Planner = ({ plannerItems }) => {
  return (
    <div className="w-full text-white grid grid-cols-1 grid-flow-row text-left">
      {plannerItems.map((item) => (
        <Weekday
          key={item._id}
          body={item.body}
          weekday={item.dayOfCurrentWeek}
        />
      ))}
    </div>
  );
};

export default Planner;
