import React from "react";
import { GridLayout, Planner } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./beep.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="w-full  text-left">
          <GridLayout />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
