import React from "react";

const styles = {
  dragger: {
    borderWidth: 10,
    borderRadius: 4,
    position: "absolute",
  },
};

const Dragger = () => {
  const dragFocus = () => {
    // Figure out what was meant to go here
  };
  return (
    <button
      className="dragHandle border-amber-600 focus:border-amber-300"
      onFocus={dragFocus}
      style={styles.dragger}
    ></button>
  );
};

export default Dragger;
