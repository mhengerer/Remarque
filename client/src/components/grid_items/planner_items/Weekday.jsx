import React, { useState, useEffect } from "react";
import JournalEntry from "./JournalEntry";
import dayjs from "dayjs";
const Weekday = ({
  id,
  body,
  weekday,
  mondaysDate,
  items,
  userCollections,
  spreadCollections,
  refetchData,
  collectionId,
}) => {
  const [plannerItems, setPlannerItems] = useState(items);
  console.log(mondaysDate);

  useEffect(() => {
    setPlannerItems(items);
  }, [items]);

  const dateCalc = (dayIndex) => {
    const adjustedMonday = dayjs(mondaysDate).subtract(7, "day");
    const dayLabel = adjustedMonday.add(dayIndex, "day").format("dddd, D");
    console.log("Adjusted Date: ", dayLabel);
    return dayLabel;
  };

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
    <div className="w-full text-left m-2">
      <div className="divider w-5/6">{`${dateCalc(weekday)}`}</div>
      <div id="weekday-content" className="">
        {plannerItems.map((item) => (
          <JournalEntry
            key={item._id}
            entryDetails={item}
            userCollections={userCollections}
            spreadCollections={spreadCollections}
            refetchData={refetchData}
            collectionId={collectionId}
          />
        ))}
      </div>
    </div>
  );
};

export default Weekday;
