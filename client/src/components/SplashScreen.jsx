import React from "react";

const SplashScreen = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        learn more
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg cursive-font">Welcome to Remarque!</h3>
          <p className="py-2">A digital format for bullet journaling.</p>
          <p className="font-bold text-sm">
            we ask that new users follow these steps:
          </p>
          <div>
            <ul className="steps steps-vertical">
              <li className="step step-primary text-xl font-bold handwriting-font">Create an account</li>
              <li className="step step-primary text-xl font-bold handwriting-font">Be sure to log in</li>
              {/* <li className="step step-primary text-xl font-bold handwriting-font">
                Find the ⓘ to Learn How To Customize your Journal
              </li> */}
              <li className="step step-primary handwriting-font text-xl">
                Begin your Digital Bullet Journal Dreams{" "}
              </li>
            </ul>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
