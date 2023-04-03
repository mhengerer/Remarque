import React from "react";

const styles = {
    dragger: {
      borderWidth: 10,
      borderRadius: 4,
      position: "absolute",
    },
  };

const Dragger = () => {
    return(
            <button className = "dragHandle border-amber-600 focus:border-amber-300" 
            onFocus={ () => this.onFocus() }style={styles.dragger}></button>
    );
};

export default Dragger;