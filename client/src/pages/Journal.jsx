import react from "react";
import { GridLayout, Navbar} from "../components/index";

const Journal = () => {
  return (
    <div className="grid grid-flow-row">
      <Navbar />
      <div className="w-full  text-left">
        <GridLayout />
      </div>
      <button></button>
    </div>
  );
};

export default Journal;
