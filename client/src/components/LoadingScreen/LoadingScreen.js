import React, { useContext, useEffect } from "react";
import classes from "./LoadingScreen.module.css";
import Logo from "../../images/logo.png";
// import { AuthContext } from "../../context/AuthContext";

// const {token} = useContext(AuthContext)

// useEffect(()=> {

// },)

function LoadingScreen() {
  return (
    <div className={classes.LoadingScreen}>
      <img src={Logo} alt="" />
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
