import { BrowserRouter } from "react-router-dom";
import { MyFirstGrid, Planner } from "./components";

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
