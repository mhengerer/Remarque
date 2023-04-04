import React from "react";
import animation1 from "../assets/animation1.gif";
import animation2 from "../assets/animation2.gif";
import animation3 from "../assets/animation3.gif";

const InfoModal = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn btn-primary rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white items-center">
          <h3 className="font-bold text-xl cursive-font">Congratulations!</h3>
          <p className="py-2">I see organization in your future🔮</p>
          <p className="font-bold text-m">This is how you can customize your journal:</p>
          <div className="text-primary">
            <p className="font-bold text-2xl m-5 handwriting-font">
              Move the provided boxes to your liking.
              <img src={animation1} alt="Gif Demonstrating Dragability" />
            </p>
            <p className="font-bold text-2xl m-5 handwriting-font">
              Add text to text areas.
              <img src={animation3} alt="Gif Demonstrating Adding Text" />
            </p>

            <p className="font-bold text-2xl m-5 handwriting-font">
              Resize the boxes to your liking.
              <img src={animation2} alt="Gif Demonstrating Resizing Cards" />
            </p>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-primary">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
