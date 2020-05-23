import React, { Component, useContext, useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Logo from "../../images/logo.png";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { withRouter } from "react-router";
import Toggler from "../Toggler/Toggler";
import DropDown from "../DropDown/DropDown";
function Layout(props) {
  // function returnVoid() {
  //   return "";
  // }

  const {
    authFunc,
    loading,
    errors,
    ipSearch,
    loadedOnce,
    token,
    regComplete,
  } = useContext(AuthContext);

  // USE STATE

  let [isToggled, setToggler] = useState(false);

  const Links = [
    {
      name: "Register",
      link: "/register",
      show: !token,
    },

    {
      name: "Home",
      link: "/",
      show: true,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      show: token,
    },
    {
      name: "Logout",
      link: "/logout",
      show: !token,
    },
  ];

  return (
    <>
      <div className={classes.DropDown}>
        <DropDown routes={Links} isToggled={isToggled} />
      </div>
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
            <img src={Logo} height={55} />
          </div>
          <div
            className={classes.MobileOnly}
            style={{
              position: "relative",
              zIndex: "3000",
            }}
          >
            <Toggler
              isToggled={isToggled}
              clicked={() => setToggler(!isToggled)}
            />
          </div>
          <div className={[classes.Routes, classes.DesktopOnly].join(" ")}>
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
