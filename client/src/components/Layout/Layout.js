// @ts-nocheck
import React, { Component, useContext, useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Logo from "../../images/logo.png";
import Footerlogo from "../../images/footerloud insighwhite.png";
import Fb from "../../images/fbfooterlogo.png";
import Twitter from "../../images/twitterfooterlogo.png";
import Instagram from "../../images/IGfooterlogo.png";
import Gmail from "../../images/gmailfooterlogo.png";
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
    errors,

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
      show: token,
    },
  ];

  return (
    <>
      <div className={classes.DropDown}>
        <DropDown routes={Links} isToggled={isToggled} token={token} />
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
              <>
                <li>
                  <a href="/register">Register</a>
                </li>

                <li>
                  <a href="/sign-in">Sign in</a>
                </li>
              </>
            ) : null}
          </div>
        </div>
        <div className={classes.Children}>{props.children}</div>

        {props.showFooter ? (
          <footer className={classes.Footer}>
            <div className={classes.FooterTop}>
              <div className="">
                <p>Top categories</p>
                <p>Top users</p>
                <p>Take survey</p>
              </div>
              <div className="">
                <p>Support</p>
                <p>FAQ</p>
              </div>
              <div className="">
                <p>Terms & Conditions</p>
                <p>Cookie policy</p>
              </div>
              <div className="">
                <p>Why Loudinsight</p>
                <p>How it works</p>
              </div>
            </div>

            <div className={classes.FooterBottom}>
              <img src={Footerlogo} alt="footerlogo" height="60px" />
              <hr />
              <img src={Twitter} alt="" height="50px" />
              <img src={Instagram} alt="" height="50px" />
              <img src={Fb} alt="" height="50px" />
              <img src={Gmail} alt="" height="50px" />
            </div>
          </footer>
        ) : null}
      </div>
    </>
  );
}

export default withRouter(Layout);
