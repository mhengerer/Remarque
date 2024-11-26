import React, { useEffect, useState, useContext } from "react";
import Weekday from "./planner_items/Weekday";
import NavCalendar from "../nav/NavCalendar";
import UpdateContext from "../UpdateContext";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../../utils/mutations";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

const Planner = ({
  userId,
  weeklyCollections,
  allSpreads,
  currentSpread,
  userCollections,
  refetchData,
}) => {
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [newSpread, setNewSpread] = useState("");

  const getPreviousMonday = (dateString) => {
    const day = dayjs.unix(dateString / 1000 + 18000);
    return day.day(-6).startOf("day");
  };

  const getNextMonday = (dateString) => {
    const day = dayjs.unix(dateString / 1000 + 18000);
    return day.day(8).startOf("day");
  };

  const mondaysDate = getNextMonday(currentSpread.monday);
  const lastMondaysDate = getPreviousMonday(currentSpread.monday);

  const handleLeftButton = async (e) => {
    e.preventDefault();
    let foundMonday;
    allSpreads.forEach(async (spread) => {
      const timestamp = parseInt(spread.monday, 10);
      const timeObj = new Date(timestamp);

      const formattedSelectedMonday = dayjs
        .utc(timeObj)
        .startOf("day")
        .format("YYYY-MM-DD");
      console.log(formattedSelectedMonday);
      const formattedLastMonday = dayjs
        .utc(lastMondaysDate)
        .startOf("day")
        .format("YYYY-MM-DD");
      if (formattedSelectedMonday === formattedLastMonday) {
        foundMonday = spread;
      }
    });
    if (foundMonday === undefined) {
      foundMonday = await addSpread({
        variables: {
          date: lastMondaysDate,
        },
      }).then((data) => {
        setNewSpread(data);
        const newSpreadId = newSpread;
        setNewSpread(null);
        setTimeout(window.location.replace(`/${newSpreadId}`), 500);
      });
    }
    window.location.replace(`/${foundMonday._id}`);
  };

  const handleRightButton = async (e) => {
    e.preventDefault();
    let foundMonday;
    allSpreads.forEach(async (spread) => {
      const timestamp = parseInt(spread.monday, 10);
      const timeObj = new Date(timestamp);

      const formattedSelectedMonday = dayjs
        .utc(timeObj)
        .startOf("day")
        .format("YYYY-MM-DD");
      console.log(formattedSelectedMonday);
      const formattedNextMonday = dayjs
        .utc(mondaysDate)
        .startOf("day")
        .format("YYYY-MM-DD");
      if (formattedSelectedMonday === formattedNextMonday) {
        foundMonday = spread;
      }
      if (spread.monday === mondaysDate) {
        foundMonday = spread;
      }
    });
    if (foundMonday === undefined) {
      foundMonday = await addSpread({
        variables: {
          date: mondaysDate,
        },
      }).then((data) => {
        setNewSpread(data);
        const newSpreadId = newSpread;
        setNewSpread(null);
        setTimeout(window.location.replace(`/${newSpreadId}`), 500);
      });
    }
    window.location.replace(`/${foundMonday._id}`);
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] text-left center-content">
      <ul
        className="menu menu-horizontal w-full flex center-content"
        style={{ justifyContent: "center" }}
      >
        <li className="justify-start">
          <button className="btn btn-ghost mt-2" onClick={handleLeftButton}>
            <svg
              aria-hidden="true"
              className="w-5 h-5 rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li tabIndex={0}>
          <NavCalendar
            allSpreads={allSpreads}
            currentSpread={currentSpread}
          ></NavCalendar>
        </li>
        <button className="btn btn-ghost mt-2" onClick={handleRightButton}>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </ul>
      <div className="h-full grid grid-cols-1 md:grid-cols-2 space-x-4 p-2">
        {currentSpread.weeklyCollections.map((collection) => (
          <Weekday
            id={collection._id}
            key={collection._id}
            items={collection.plannerItems}
            weekday={collection.title}
            mondaysDate={mondaysDate}
            spreadCollections={weeklyCollections}
            userCollections={userCollections}
            refetchData={refetchData}
            collectionId={collection._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Planner;
