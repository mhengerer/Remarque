import React from "react";
import { GridLayout, Planner } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./beep.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid grid-cols-2 grid-flow-row">
          <div className="w-full  text-left">
            <Planner />
          </div>
          <div className="w-full  text-left">
            <GridLayout />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
