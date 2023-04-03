import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";

import { UPDATE_PLANNERITEM } from "../utils/mutations";

// date function
const Weekday = (props) => {
  const [textArea, setTextArea] = useState("");
  const [updatePlannerItem, { error }] = useMutation(UPDATE_PLANNERITEM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const plannerItem = await updatePlannerItem({});
    } catch (e) {
      console.log(e);
    }
  };

  //console.log(JSON.stringify(props));

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setTextArea({ ...textArea, value });
  };

  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-4 border-base-300">
      <label className="label">
        <span className=" text-white label-text">{props.Weekday}</span>
      </label>
      <TextareaAutosize
        type="text"
        minRows="3"
        placeholder="Type here"
        className="flex textarea textarea-bordered w-full resize-none"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Weekday;
