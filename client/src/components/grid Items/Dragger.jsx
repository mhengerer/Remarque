import React from "react";

const styles = {
    dragger: {
      borderWidth: 7,
      borderRadius: 4,
      position: "absolute",
      right: 0,
    },
  };

const Dragger = () => {
    return(
            <button className = "dragHandle border-red-400 focus:border-green-300" 
            onFocus={ () => this.onFocus() }style={styles.dragger}></button>
    );
};

export default Dragger;