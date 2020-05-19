import React from "react";
import classes from "./LoadingScreen.module.css";
function LoadingScreen() {
  return (
    <div className={classes.LoadingScreen}>
      <div className={classes["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
