import React from "react";

const Modal = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
            <div className="hero min-h-screen bg-gradient-to-r from-secondary to-primary">
              <div className="hero-content flex-col lg:flex-row">
                <div>
                  <h1 className="text-5xl font-bold">
                    Remarque - A Bullet Journal Application
                  </h1>
                  <p className="py-6">
                    The perfect digital tool for everyday planning.
                  </p>
                  <div className="modal-action"></div>
                  <label htmlFor="my-modal" className="btn btn-primary">
                    Get Started
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
