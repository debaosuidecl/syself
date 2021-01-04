//@ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputWithShade from "../InputWithShade/InputWithShade";
import classes from "./AuthForm3.module.css";
import SyselfButton from "../SyselfButton/SyselfButton";
import { SERVER_PORT } from "../Global/Global";
import { Countries } from "../../AsyncHelpers/returnCountriesWithCode";
import SmallLoader from "../SmallLoader/SmallLoader";
import SelectWithShade from "../SelectWithShade/SelectWithShade";
import Axios from "axios";
function AuthForm3() {
  // CONTEXTS
  const { setUserType, usertype } = useContext(AuthContext);

  //    STATE

  // const [usertype, setUserType] = useState("")

  // EFFECTS

  //    FUNCTIONS
  //HANDLE INPUT FOCUS OPERATIONS
  const focusHandler = (control, isFocus) => {
    //    if(control == "firstName"){
    //          toggleFirstNameFocus(!firstNameIsFocused)
    //        isFocus? setFirstNameBlur(false): setFirstNameBlur(true)
    //     } else if(control == "lastName"){
    //         toggleLastNameFocus(!lastNameIsFocused)
    //         !isFocus? setLastNameBlur(true): setLastNameBlur(false)
    //    }
    //    else if(control == "userName"){
    //        isFocus?setUserNameBlur(false) : setUserNameBlur(true)
    //        toggleUserNameFocus(!userNameIsFocused)
    //     }
    //     else if(control == "phoneNumber"){
    //         !isFocus ?setPhoneNumberBlur(true): setPhoneNumberBlur(false)
    //         togglePhoneNumberFocus(!phoneNumberIsFocused)
    //     }
  };
  function initiateFormValidation(returnSomething) {}
  //COMPONENT RETURN
  return (
    <div className={classes.AuthForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={classes.Form}
      >
        <div className={classes.preForm}>
          <h3>Join us</h3>
          <p className={classes.smallWith}>as a</p>

          {["Freelancer", "Jobseeker", "Project owner", "Recruiter"].map(
            (user, i) => {
              return (
                <div
                  className={
                    user === usertype
                      ? classes.ButtonSelected
                      : classes.ButtonCont
                  }
                >
                  <SyselfButton
                    key={i}
                    isfullwidth
                    onClick={(e) => {
                      console.log(e.target.innerText);
                      // console.log(user, usertype)
                      setUserType(e.target.innerText);
                    }}
                  >
                    {user}
                  </SyselfButton>
                </div>
              );
            }
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm3;
