import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";
import { FaRegSave } from "react-icons/fa";
import { UPDATE_PLANNERITEM } from "../utils/mutations";

const Weekday = ({ id, body, weekday }) => {
  const [updatePlannerItem] = useMutation(UPDATE_PLANNERITEM);


  const handleSubmit = async () => {
    try {
      const plannerItem = await updatePlannerItem({
        variables: {
          id: id,
          body: bodyState,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [bodyState, setBodyState] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setBodyState(value);
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
        <span className="label-text">{`${getDayOfWeek(
          weekday
        )}`}</span>
      </label>
      <TextareaAutosize
        type="text"
        minRows="3"
        defaultValue={`${checkBody(body)}`}
        placeholder="Type here"
        className="flex textarea textarea-bordered w-full resize-none text-xl handwriting-font"
        onChange={handleChange}
      />
      <button className="justify-items-end" onClick={handleSubmit}>
        <FaRegSave />
      </button>
    </div>
  );
};

export default Weekday;
