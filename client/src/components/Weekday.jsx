import React from "react";

// date function

const Weekday = () => {
  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-4 border-black">
        <label className="label">
          <span className="label-text">Monday 03/25</span>
        </label>
      <textarea
        type="text"
        placeholder="Type here"
        className="flex textarea textarea-bordered textarea-lg w-full max-w-xs"
      />
    </div>
  );
};

export default Weekday;
