import React, { Component, useContext, useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Logo from "../../images/logo.png";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { withRouter } from "react-router";
function Layout(props) {
  function returnVoid() {
    return "";
  }
  const {
    authFunc,
    loading,
    errors,
    ipSearch,
    loadedOnce,
    token,
    regComplete,
  } = useContext(AuthContext);
  // USE EFFECT TO AUTHENTICATE BEFORE  A

  return (
    <>
      <div className={classes.ErrorCont}>
        {errors &&
          errors.map((error) => {
            return <ErrorMessage error={error.msg} />;
          })}
      </div>
      <div>
        <div className={classes.Layout}>
          <div
            className={classes.Logo}
            onClick={() => (window.location.href = "/")}
          >
            <img src={Logo} height={80} />
          </div>
          <div className={classes.Routes}>
            {token ? (
              <>
                {regComplete ? (
                  <li>
                    <a href="/dashboard">Dashboard</a>
                  </li>
                ) : null}
                <li>
                  <a href="/logout">Logout</a>
                </li>
              </>
            ) : null}
            {!token ? (
              <li>
                <a href="/register">Register</a>
              </li>
            ) : null}
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </>
  );
}

export default withRouter(Layout);
