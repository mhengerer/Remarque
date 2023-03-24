import React from "react";
import { MyFirstGrid, Planner } from "./components";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Planner />
        <MyFirstGrid />
      </div>
    </BrowserRouter>
  );
};

export default App;
