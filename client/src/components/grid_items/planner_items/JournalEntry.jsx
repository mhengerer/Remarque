import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PLANNERITEM } from "../../../utils/mutations";
import TimeDrop from "./TimeDrop";
import dayjs from "dayjs";
const JournalEntry = ({
  entryDetails,
  userCollections,
  spreadCollections,
  refetchData,
  collectionId,
}) => {
  // State variables for user input and button text
  const [updatePlannerItem, { error }] = useMutation(UPDATE_PLANNERITEM);
  const [inputText, setInputText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [inputTime, setInputTime] = useState(
    dayjs(entryDetails.scheduled).format("h:mma")
  );
  const [additionalNotes, setAdditionalNotes] = useState(entryDetails.body);
  const [status, setStatus] = useState(entryDetails.status);
  const [selected, setSelected] = useState(
    entryDetails.collections.map((id) => ({
      value: id,
      label:
        (
          userCollections.find((c) => c._id === id) ||
          spreadCollections.find((c) => c._id === id) ||
          {}
        ).title || "Unknown",
    }))
  );

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
      return num;
    }
  }

  const userOptions = userCollections.map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const spreadOptions = spreadCollections.map((collection) => ({
    value: collection._id,
    label: getDayOfWeek(collection.title),
  }));

  let allCollections = [...userOptions, ...spreadOptions];
  allCollections = allCollections;

  const [collections, setCollections] = useState(allCollections);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setCollections(collections.event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCheckboxChange = (e, collection) => {
    if (e.target.checked) {
      setSelected((prevSelected) => [...prevSelected, collection]);
      console.log(selected);
    } else {
      setSelected((prevSelected) =>
        prevSelected.filter(
          (selectedCollection) => selectedCollection.value !== collection.value
        )
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const timeFormat = "h:mma";

    const scheduledFormatted = dayjs(inputTime, timeFormat);
    let scheduled;

    if (scheduledFormatted.isValid()) {
      scheduled = scheduledFormatted.year(1970).month(0).date(1);
    }

    try {
      console.log(entryDetails._id);
      console.log(inputText);
      console.log(additionalNotes);
      console.log(scheduled);
      console.log(status);
      console.log(selected);
      const selectedValues = await selected.map((item) => item.value);
      console.log(selectedValues);
      const mutationResponse = await updatePlannerItem({
        variables: {
          _id: entryDetails._id,
          title: inputText,
          body: additionalNotes,
          scheduled: scheduled,
          status: status,
          collections: selectedValues,
        },
      });
      refetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleTimeChange = (newTimeValue) => {
    setInputTime(dayjs(newTimeValue).format("h:mma"));
  };

  useEffect(() => {
    setInputText(entryDetails.title);
  }, []);

  useEffect(() => {
    if (entryDetails.collections) {
      const selectedCollections = collections.filter((collection) =>
        entryDetails.collections.includes(collection.value)
      );
      console.log(selectedCollections);
      setSelected(
        selectedCollections.map((collection) => ({
          value: collection.value,
          label: collection.label,
        }))
      );
    }
  }, [entryDetails.collections, collections]);

  useEffect(() => {
    handleTimeChange(entryDetails.scheduled);
    if (!entryDetails.scheduled) {
      setInputTime("");
    }
    let newButtonText = `${inputTime} ${inputText}`;
    if (status === "-") {
      newButtonText = `- ${inputText}`;
    }
    setButtonText(newButtonText);
  }, [entryDetails.scheduled, inputTime, inputText]);

  return (
    <>
      <label
        htmlFor={entryDetails._id + collectionId}
        className="btn bg-transparent border-2 btn-sm rounded-full m-1"
      >
        <h1 className={`text-s ${status === "X" ? "line-through" : ""}`}>
          {buttonText}
        </h1>
      </label>
      <input
        type="checkbox"
        id={entryDetails._id + collectionId}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white grid-flow-row">
          <div className="flex justify-end">
            <label
              htmlFor={entryDetails._id + collectionId}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#D1D5DB"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <div id="modal-header" className="flex justify-between my-2">
            <div className="flex items-center gap-2 h-8">
              <input
                type="text"
                style={{ width: "75%" }}
                className="textarea grow h-12 textarea-bordered rounded-md"
                placeholder="Entry:"
                value={inputText}
                onChange={handleInputChange}
              />
              <TimeDrop
                style={{ width: "25%" }}
                onChange={setInputTime}
                value={inputTime}
                defaultTime={inputTime}
              ></TimeDrop>
            </div>
          </div>
          <textarea
            type="text"
            placeholder="-Any additional notes you may have.&#10;-People, places, and things that don't &#10;fit in the title."
            className="textarea w-full h-32 my-2 rounded-md textarea-bordered"
            value={additionalNotes}
            onChange={handleNotesChange}
          />
          <div className="space-y-4">
            <div className="flex flex-col">
              {collections.map((collection, index) => {
                return (
                  <label key={index} className="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      name="collectionCheckbox"
                      value={collection.value}
                      checked={selected.some(
                        (selectedCollection) =>
                          selectedCollection.value === collection.value
                      )}
                      onChange={(e) => handleCheckboxChange(e, collection)}
                    />
                    <span className="ml-2 text-gray-700">
                      {collection.label}
                    </span>
                  </label>
                );
              })}
            </div>
            <select
              style={{ width: "25%" }}
              className="input input-bordered flex rounded-md justify-right"
              onChange={handleStatusChange}
              defaultValue={status}
            >
              <option value="-">Note</option>
              <option value="O">Open</option>
              <option value="X">Closed</option>
            </select>
          </div>

          <div className="modal-action">
            <label
              htmlFor={entryDetails._id + collectionId}
              className="btn btn-sm btn-primary"
              onClick={handleFormSubmit}
            >
              Save Edits
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalEntry;
