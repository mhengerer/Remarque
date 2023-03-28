import React from "react";

const Card = () => {
  return (
    <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
      <h2>List</h2>
      <div className="card-body">
        <textarea
          type="text"
          placeholder="Type here"
          className="flex textarea textarea-bordered h-full w-full"
        />
      </div>
    </div>
  );
};

export default Card;
