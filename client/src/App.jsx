import React from "react";
import { GridLayout, Planner } from "./components";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Planner />
        <GridLayout />
      </div>
    </BrowserRouter>
  );
};

export default App;
