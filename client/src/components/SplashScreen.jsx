import React from "react";

const SplashScreen = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        open modal
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box h-5/6 w-11/12 max-w-5xl hero min-h-fit bg-gradient-to-r from-secondary to-primary">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">
                Remarque - A Bullet Journal Application
              </h1>
              <p className="py-6">
                The perfect digital tool for everyday planning.
              </p>
              <div className="modal-action"></div>
              <div className="flex justify-center space-x-10">
                <label htmlFor="my-modal" className="btn btn-primary">
                  Get Started
                </label>
                <div className="modal-action"></div>
                <label htmlFor="demo" className="btn btn-secondary">
                  Learn More
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
