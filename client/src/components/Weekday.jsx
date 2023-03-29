import React from "react";

// date function

const Weekday = () => {
  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-4 border-base-300">
      <label className="label">
        <span className=" text-white label-text">Monday 03/25</span>
      </label>
      <textarea
        type="text"
        placeholder="Type here"
        className="flex textarea textarea-bordered textarea-lg w-full"
      />
    </div>
  );
};

export default Weekday;
