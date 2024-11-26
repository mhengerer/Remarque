import React, { useState, useEffect } from "react";
import TimePicker from "react-timepicker-c";
import dayjs from "dayjs";

const TimeDrop = ({ onChange, defaultTime }) => {
  const [timeValue, setTimeValue] = useState("");

  const setIfDefault = (defaultTime) => {
    const timeFormat = "h:mma";
    if (dayjs(defaultTime, timeFormat, true).isValid()) {
      return defaultTime;
    }
  };

  useEffect(() => {
    const time = setIfDefault(defaultTime);
    if (time) {
      setTimeValue(defaultTime);
    }
  }, [defaultTime]);

  const handleTimeChange = (timeValue) => {
    setTimeValue(timeValue);
    onChange(timeValue);
  };

  return (
    <TimePicker
      className=""
      id="time-picker"
      minTime="7:00am"
      maxTime="11:45pm"
      onChange={handleTimeChange}
      timeValue={timeValue}
      name="timeField"
    />
  );
};

export default TimeDrop;
