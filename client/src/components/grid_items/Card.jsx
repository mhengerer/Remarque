import React, { useState, useEffect } from "react";
import JournalEntry from "./planner_items/JournalEntry";

const Card = ({
  cardItems,
  userCollections,
  spreadCollections,
  refetchData,
}) => {
  const [items, setItems] = useState(cardItems.plannerItems);

  function checkTitle(t) {
    if (!t) {
      return "";
    } else {
      return t;
    }
  }

  function checkBody(b) {
    if (!b) {
      return "";
    } else {
      return b;
    }
  }

  useEffect(() => {
    setItems(cardItems.plannerItems);
  }, [cardItems]);

  return (
    <div className="card card-compact card-bordered w-full h-full md:w-2/3 md:h-1/3 lg:w-1/4 m-8 bg-base-100 shadow-xl rounded-3xl">
      <textarea
        type="text"
        placeholder="Title"
        defaultValue={`${checkTitle(cardItems.title)}`}
        className="flex textarea textarea-bordered h-2 w-full text-center font-bold resize-none text-lg cursive-font"
      />
      <div className="space-x-1 space-y-1">
        {items.map((item) => (
          <JournalEntry
            entryDetails={item}
            key={item._id}
            userCollections={userCollections}
            spreadCollections={spreadCollections}
            refetchData={refetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
