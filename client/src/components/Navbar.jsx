import React from "react";
import Auth from "../utils/auth";

const Navbar = () => {
  // const [spread, setSpread] = useState(currentSpread);
  const spreadArray = [0,1,2,3,4,5,6,7,8];
  // const currentSpread = spreadArray[4];

  const navPrev = (e) => {
    e.preventDefault();
    console.log("boof");

    // setSpread(spreadArray[i-1]);
  };

  const navNow = (e) => {
    e.preventDefault;
    console.log("beef");

    // setSpread(currentSpread)
  };

  const navNext = (e) => {
    e.preventDefault();
    console.log("biff");

    // setSpread(spreadArray[i+1]);
  };

  const navHere = (e) => {
    e.preventDefault();
    console.log("borf");
    console.log(e.target.value);

    // setSpread(spreadArray[i])
  };

  return (
    <div className="navbar bg-base-100">
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
              {spreadArray.map((spread) => {
                return (
                  <button value={spread} onClick={navHere}>
                    <a>{spread}</a>
                  </button>
                );
              })}
            </li>
          </ul>
        </div>

        <button className="btn btn-ghost normal-case hidden lg:flex text-xl">
          Remarque
        </button>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal">
          <button className="btn btn-square" onClick={navPrev}>
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
            <button className="btn btn-accent mx-3" onClick={navNow}>
              <h2 className="font-bold">This Week</h2>
            </button>
          </li>
          <button className="btn btn-square" onClick={navNext}>
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
          className="btn flex-initial max-w-28 ml-5"
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
