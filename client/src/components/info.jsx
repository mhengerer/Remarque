import React from "react";

const InfoModal = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn btn-primary rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratualtions!</h3>
          <p className="py-2">This is the start to an organized future!</p>
          <p className="font-bold text-m">
            How to customize your journal:
          </p>
          <div>
            <p className="font-bold text-sm">
            Move the provided boxes to your liking.
            <img src="../assets/annimation1.gif" alt="" />
          </p>
          <p className="font-bold text-sm">
            Add texts to your text boxes.
          </p>
          <p className="font-bold text-sm">
            Resize the boxes to your liking.
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