import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../../utils/mutations";
import { HonestWeekPicker } from "./HonestWeekPicker/HonestWeekPicker";
dayjs.extend(dayOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

const NavCalendar = ({ allSpreads, currentSpread }) => {
  const [thisMonday, setThisMonday] = useState(
    dayjs.unix(currentSpread.monday / 1000 + 18000).format("YYYY-MM-DD")
  );
  const [thisSunday, setThisSunday] = useState(
    dayjs
      .unix(currentSpread.monday / 1000 + 18000)
      .day(7)
      .format("YYYY-MM-DD")
  );
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [week, setWeek] = useState("");
  const navigate = useNavigate();

  const isFirstRender = useRef(true);
  useEffect(() => {
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  const onChange = async (week) => {
    setWeek(week);
    console.log("First day of week: " + week.firstDay);

    const formattedSelectedMonday = dayjs(week.firstDay)
      .startOf("day")
      .format("YYYY-MM-DD");

    // Find the spread for the selected week
    const selectedSpread = allSpreads.find((spread) => {
      console.log(spread.monday);
      const timestamp = parseInt(spread.monday, 10);
      const timeObj = new Date(timestamp);
      const formattedSpreadMonday = dayjs
        .utc(timeObj)
        .startOf("day")
        .format("YYYY-MM-DD");
      console.log(formattedSpreadMonday);
      return formattedSpreadMonday === formattedSelectedMonday;
    });

    if (selectedSpread) {
      // Navigate to the spread page for the selected week
      window.location.href = `/${selectedSpread._id}`;
    } else {
      const newWeek = addSpread({
        variables: {
          date: dayjs(week.firstDay).toDate(),
        },
      }).then((response) => {
        const data = response.data.addSpread;
        const newSpreadId = data._id;
        window.location.href = `/${newSpreadId}`;
      });
    }
  };

  return (
    <HonestWeekPicker
      onChange={onChange}
      monday={thisMonday}
      sunday={thisSunday}
    ></HonestWeekPicker>
  );
};

export default NavCalendar;
