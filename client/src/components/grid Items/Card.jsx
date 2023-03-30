import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const Card = () => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <textarea
        type="text"
        placeholder="Title"
        className="flex textarea textarea-bordered h-2 w-full text-center font-bold text-lg resize-none"
      />
      <div>
        <TextareaAutosize
        minRows="13"
        maxRows="13"
        placeholder="Type here"
        className="flex textarea h-full w-full resize-none"/>
      </div>
    </div>
  );
};

export default Card;
