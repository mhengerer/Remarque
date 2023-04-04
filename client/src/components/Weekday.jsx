import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";

import { FaRegSave } from "react-icons/fa";

import { UPDATE_PLANNERITEM } from "../utils/mutations";

// date function
const Weekday = ({ id, body, weekday }) => {
  // const [textArea, setTextArea] = useState("");
  const [updatePlannerItem, { error }] = useMutation(UPDATE_PLANNERITEM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const plannerItem = await updatePlannerItem({ id, body: bodyState });
      console.log(plannerItem);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(id);
  console.log(body);
  console.log(weekday);

  const [bodyState, setBodyState] = useState("");

  const handleChange = (e) => {
    const { body } = e.target;

    setBodyState(body);
  };

  function checkBody(b) {
    if (!b) {
      return "";
    } else {
      return b;
    }
  }

  function getDayOfWeek(num) {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    if (num >= 0 && num <= 6) {
      return daysOfWeek[num];
    } else {
      console.log("Invalid input: please provide a number between 0 and 6.");
    }
  }

  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-4 border-base-300">
      <label className="label">
        <span className=" text-white label-text">{`Today: ${getDayOfWeek(
          weekday
        )}`}</span>
      </label>
      <TextareaAutosize
        type="text"
        minRows="3"
        defaultValue={`${checkBody(body)}`}
        placeholder="Type here"
        className="flex textarea textarea-bordered w-full resize-none"
        onChange={handleChange}
      />
      <button className="justify-items-end" onSubmit={handleSubmit}>
        <FaRegSave />
      </button>
    </div>
  );
};

export default Weekday;
