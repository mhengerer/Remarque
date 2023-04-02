import react from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";

const Journal = () => {
  return (
    <div className="grid grid-flow-row">
      <Navbar />
      <div className="w-full  text-left">
        <GridLayout />
      </div>

      <div className="sticky bottom-0 left-70 h-20 w-20">
        <InfoModal />
      </div>

      <button></button>
    </div>
  );
};

export default Journal;
