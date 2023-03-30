import React from "react";
import TextareaAutosize from "react-textarea-autosize";

// date function

const Weekday = () => {
  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-4 border-base-300">
      <label className="label">
        <span className=" text-white label-text">Monday 03/25</span>
      </label>
      <TextareaAutosize
        type="text"
        minRows="3"
        placeholder="Type here"
        className="flex textarea textarea-bordered w-full resize-none"
      />
    </div>
  );
};

export default Weekday;
