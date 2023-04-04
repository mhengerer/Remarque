import React from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../utils/mutations";

const getNextMonday = (dateString) => {
  let inputDate = new Date(dateString);
  let sevenDaysLater = new Date(inputDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  return sevenDaysLater.toISOString().slice(0, 10);
};

const getPreviousMonday = (dateString) => {
  const day = new Date(dateString);
  console.log(day.getUTCDate());
  const dayOfWeek = day.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  const mondaysDate = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate() - daysSinceMonday
  );
  return mondaysDate;
};

const Navbar = ({ allSpreads, currentSpread }) => {
  console.log(allSpreads);
  console.log(currentSpread);
  const [addSpread] = useMutation(ADD_SPREAD);
  const mondaysDate = getNextMonday(currentSpread.monday);
  //   const navPrev = (e) => {
  //     e.preventDefault();
  //     console.log("boof");
  //    };

  //   const navNow = (e) => {
  //     e.preventDefault;
  //   };

  //   const navHere = (e) => {
  //     e.preventDefault();
  //     console.log("borf");
  //     console.log(e.target.value);

  //     setSpread(spreadArray[i])
  //  };

  return (
    <div className="navbar bg-gradient-to-r from-primary to-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>Table of Contents</li>
            <li>
              {/* {spreadArray.map((spread) => {
                return ( */}
              <button>
                <a>uuuh</a>
              </button>
              {/* );
              })} */}
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost normal-case hidden lg:flex text-xl">
          Remarque
        </button>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal">
          <button className="btn btn-ghost">
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
          <li tabIndex={0}>
            <button className="btn btn-accent mx-3">
              <h2 className="font-bold">This Week</h2>
            </button>
          </li>
          <button
            className="btn btn-ghost"
            onClick={async (e) => {
              e.preventDefault();
              let foundMonday;
              allSpreads.forEach((spread) => {
                console.log("To check: " + spread.monday);
                console.log("Check against: " + mondaysDate);
                if (spread.monday === mondaysDate) {
                  foundMonday = spread._id;
                }
              });
              if (foundMonday === undefined) {
                foundMonday = await addSpread({
                  variables: {
                    date: mondaysDate,
                  },
                }).then((data) => {
                  console.log(data);
                  window.location.replace(`/?id=${data._id}`);
                });
              }
              window.location.replace(`/?id=${foundMonday}`);
            }}
          >
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
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-ghost flex-initial max-w-28 ml-5"
          href="/login"
          onClick={() => Auth.logout()}
        >
          Log out
        </a>
      </div>
    </div>
  );
};

export default Navbar;
