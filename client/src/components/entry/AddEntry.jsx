import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import trashImg from "../../assets/delete.svg";
import TimeDrop from "../grid_items/planner_items/TimeDrop";
import {
  ADD_PLANNERITEM,
  ADD_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_PLANNERITEM,
  DELETE_COLLECTION,
} from "../../utils/mutations";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const AddEntry = ({
  spreadCollections,
  userCollections,
  filledEntry,
  hidePlusLabel,
  refetchData,
}) => {
  const [addPlannerItem, { plannerItemError }] = useMutation(ADD_PLANNERITEM);
  const [deletePlannerItem, { data, loading, error }] =
    useMutation(DELETE_PLANNERITEM);
  const [addCollection, { collectionError }] = useMutation(ADD_COLLECTION);
  const [updateCollection, { updateError }] = useMutation(UPDATE_COLLECTION);
  const [deleteCollection, { deleteCollectionError }] =
    useMutation(DELETE_COLLECTION);
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("09:00");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [editCollection, setEditCollection] = useState(
    userCollections[0] || []
  );
  const [plannerItems, setPlannerItems] = useState(
    editCollection.plannerItems || []
  );
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collectionSuccess, setCollectionSuccess] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [collections, setCollections] = useState([
    ...userCollections,
    ...spreadCollections,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userOptions = userCollections.map((collection) => ({
      value: collection._id,
      label: collection.title,
      plannerItems: collection.plannerItems,
    }));

    const spreadOptions = spreadCollections.map((collection) => ({
      value: collection._id,
      label: getDayOfWeek(collection.title),
      plannerItems: collection.plannerItems,
    }));

    setCollections([...userOptions, ...spreadOptions]);
  }, [userCollections, spreadCollections]);

  // const { triggerRerender } = useContext(UpdateContext);

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

  const handleCollectionSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleCheckboxChange = (e, collection) => {
    if (e.target.checked) {
      setSelected([...selected, collection.value]);
    } else {
      setSelected(
        selected.filter((selectedValue) => selectedValue !== collection.value)
      );
    }
    console.log(selected);
  };

  const handleDeleteEntry = async (event) => {
    event.preventDefault();
    const entryId = event.target.value;
    try {
      console.log(editCollection);
      const mutationResponse = await deletePlannerItem({
        variables: { _id: entryId, collectionId: editCollection.value },
      });
      if (mutationResponse.data && mutationResponse.data.deletePlannerItem) {
        setDeletionSuccess(true);
        setEditCollection((prevCollection) => ({
          ...prevCollection,
          plannerItems: prevCollection.plannerItems.filter(
            (item) => item._id !== entryId
          ),
        }));
      }
      refetchData();
      return mutationResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleDeleteCollection = async (event) => {
    const collectionId = editCollection.value;
    try {
      console.log(collectionId);
      const mutationResponse = await deleteCollection({
        variables: { _id: collectionId },
      });
      if (mutationResponse.data.deletePlannerItem) {
        setCollectionSuccess(true);
        // Remove the deleted collection from the collections state
        setCollections((prevCollections) =>
          prevCollections.filter(
            (collection) => collection.value !== collectionId
          )
        );
        // Reset editCollection to the first collection in the updated list or to an empty object if the list is empty
        setEditCollection(
          (prevCollections) =>
            prevCollections[0] || {
              value: "$new",
              label: "New Collection",
              plannerItems: [],
            }
        );
      }
      // triggerRerender();
      return mutationResponse;
    } catch (error) {
      console.error("Error deleting collection:", error);
      return null;
    }
  };

  const handleEditCollection = (event) => {
    const collectionId = event.target.value;
    if (collectionId === "$new") {
      setEditCollection({ value: "$new", label: "", plannerItems: [] });
      setNewCollectionName(""); // Reset the new collection name
    } else {
      const selectedCollection = collections.find(
        (collection) => collection.value === collectionId
      );
      setEditCollection(selectedCollection || userCollections[0]);
      setNewCollectionName(selectedCollection ? selectedCollection.label : ""); // Update the new collection name
    }
  };

  const handleUpdateCollection = async (event) => {
    event.preventDefault();
    const selectedCollection = editCollection;
    const title = newCollectionName;
    console.log(selectedCollection);
    console.log(title);
    const mutationResponse = await updateCollection({
      variables: {
        id: selectedCollection.value,
        title: title,
      },
    });
    refetchData();
  };

  const handleSubmitCollection = async (event) => {
    event.preventDefault();
    const title = newCollectionName;
    try {
      const collectionDetails = await addCollection({
        variables: {
          title: title,
        },
      }).then(() => {
        refetchData();
      });
      if (collectionDetails) {
        setCollectionSuccess(true);
      }
      return collectionDetails;
    } catch (error) {
      console.error("Error adding collection:", error);
      return null;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const timeFormat = "h:mma";

    const scheduledFormatted = dayjs(inputTime, timeFormat);
    let scheduled;

    if (scheduledFormatted.isValid()) {
      scheduled = scheduledFormatted.year(1970).month(0).date(1);
    } else {
      setIsSubmitting(false);
      console.error("Invalid input time format.");
    }

    try {
      let plannerItemId;
      const mutationResponse = await addPlannerItem({
        variables: {
          title: inputText,
          body: additionalNotes,
          scheduled: scheduled,
          status: status,
          collections: selected,
        },
      }).then((response) => {
        plannerItemId = response;
        refetchData();
        return plannerItemId;
      });
    } catch (e) {
      console.log(e);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    setPlannerItems(editCollection.plannerItems || []);
  }, [editCollection]);

  return (
    <>
      <label
        htmlFor="planner_entry"
        className="btn bg-accent border-2 btn-lg btn-circle rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
        </svg>
      </label>

      <input type="checkbox" id="planner_entry" className="modal-toggle" />
      <div className="modal z-10">
        <div className="modal-box h-5/6 bg-white">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between">
              <div className="tabs tabs-lifted mb-4">
                <button
                  className={`tab ${activeTab === "tab1" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("tab1")}
                >
                  New Entry
                </button>
                <button
                  className={`tab ${activeTab === "tab2" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("tab2")}
                >
                  Edit Collections
                </button>
              </div>
              <div className="flex justify-end">
                <label
                  htmlFor="planner_entry"
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
            </div>
            {activeTab === "tab1" ? (
              <div>
                <div id="modal-header" className="flex justify-between my-2">
                  <div className="flex items-center gap-2 h-8">
                    <input
                      type="text"
                      style={{ width: "75%" }}
                      className="textarea grow h-12 textarea-bordered rounded-md"
                      placeholder="Entry Title:"
                      value={inputText}
                      onChange={handleInputChange}
                    />
                    <TimeDrop
                      style={{ width: "25%" }}
                      onChange={setInputTime}
                      value={inputTime}
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
                <div className="space-y-4 z-0">
                  <div className="flex flex-col border-2 rounded-md h-48 overflow-y-auto">
                    {collections.map((collection, index) => (
                      <label
                        key={index}
                        className="inline-flex items-center m-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-gray-600"
                          name="collectionCheckbox"
                          value={collection.value}
                          checked={selected.includes(collection.value)}
                          onChange={(e) => handleCheckboxChange(e, collection)}
                        />
                        <span className="ml-2 text-gray-700">
                          {collection.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <select
                    style={{ width: "25%" }}
                    className="input input-bordered flex rounded-md justify-right"
                    onChange={handleStatusChange}
                  >
                    <option value="-">Note</option>
                    <option value="O">Open</option>
                    <option value="X">Closed</option>
                  </select>
                </div>

                <div className="modal-action">
                  <label
                    htmlFor="planner_entry"
                    className={`btn btn-sm btn-primary ${
                      isSubmitting ? "loading" : ""
                    }`}
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Entry"}
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4 relative h-3/4">
                <select
                  style={{ width: "100%" }}
                  className="input input-bordered flex rounded-md justify-right"
                  onChange={handleEditCollection}
                >
                  {collections.map((collection) => {
                    return (
                      <option
                        value={collection.value}
                        onChange={handleEditCollection}
                      >
                        {collection.label}
                      </option>
                    );
                  })}
                  <option value="$new">New Collection</option>
                </select>

                {editCollection.value === "$new" ? (
                  <div className="space-x-1">
                    <label className="form-control">
                      <div className="flex items-center">
                        <input
                          type="text"
                          style={{ width: "60%" }}
                          className="input grow h-12 textarea-bordered rounded-md mr-2"
                          placeholder="New Collection Name: "
                          value={newCollectionName}
                          onChange={(e) => setNewCollectionName(e.target.value)}
                        />
                        <button
                          className="btn btn-outline"
                          onClick={handleSubmitCollection}
                        >
                          Add Collection
                        </button>
                      </div>
                      {collectionSuccess && (
                        <label className="label">
                          <span className="label-text-alt">
                            Collection Added!
                          </span>
                        </label>
                      )}
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="space-x-1">
                      <input
                        type="text"
                        style={{ width: "66%" }}
                        className="textarea grow h-12 textarea-bordered rounded-md"
                        placeholder="Collection Name: "
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                      />
                      <button
                        onClick={handleUpdateCollection}
                        className="btn btn-outline"
                      >
                        Edit Collection
                      </button>
                    </div>
                    <div className="flex flex-col border-2 rounded-md h-48 overflow-y-auto">
                      {plannerItems.map((plannerEntry, index) => {
                        return (
                          <button
                            className="btn btn-sm btn-outline btn-error justify-between m-0.5"
                            key={index}
                            value={plannerEntry._id}
                            onClick={handleDeleteEntry}
                          >
                            <img src={trashImg} alt="Delete Entry Icon" />
                            {plannerEntry.title}
                          </button>
                        );
                      })}
                      <button
                        className="btn btn-outline absolute bottom-0"
                        onClick={handleDeleteCollection}
                      >
                        Delete Collection
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEntry;
