//@ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputWithShade from "../InputWithShade/InputWithShade";
import classes from "./AuthForm2.module.css";
import SyselfButton from "../SyselfButton/SyselfButton";
import { SERVER_PORT } from "../Global/Global";
import { Countries } from "../../AsyncHelpers/returnCountriesWithCode";
import SmallLoader from "../SmallLoader/SmallLoader";
import SelectWithShade from "../SelectWithShade/SelectWithShade";
import Axios from "axios";
function AuthForm2() {
  // CONTEXTS
  const {
    localSignupStepTwo,
    isAuthenticatingLocal,
    firstName,
    lastName,
    location,
    phoneNumberContext,
    userNameContext,
  } = useContext(AuthContext);

  //    STATE
  const [stateFirstName, setFirstName] = useState(firstName || "");
  const [stateLastName, setLastName] = useState(lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberContext || "");
  const [userName, setUserName] = useState(userNameContext || "");
  const [userNameInvalidMessage, setUserNameInvalidMessage] = useState("");
  const [country, setCountry] = useState(location);
  const [firstNameInvalidMessage, setFirstNameInvalidMessage] = useState("");
  const [lastNameInvalidMessage, setLastNameInvalidMessage] = useState("");
  const [phoneNumberInvalidMessage, setPhoneNumberInvalidMessage] = useState(
    ""
  );
  const [firstNameIsFocused, toggleFirstNameFocus] = useState(false);
  const [lastNameIsFocused, toggleLastNameFocus] = useState(false);
  const [phoneNumberIsFocused, togglePhoneNumberFocus] = useState(false);
  const [userNameIsFocused, toggleUserNameFocus] = useState(false);
  const [firstNameIsBlurredOnce, setFirstNameBlur] = useState(false);
  const [lastNameIsBlurredOnce, setLastNameBlur] = useState(false);
  const [phoneNumberIsBlurredOnce, setPhoneNumberBlur] = useState(false);
  const [userNameIsBlurredOnce, setUserNameBlur] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [userNameIsValid, setUserNameValid] = useState(false);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [formValidity, setFormValidity] = useState(false);

  // EFFECTS
  //FIRST NAME MONITOR
  useEffect(() => {
    console.log(firstName, stateFirstName, "BLAHHHHH");
    if (stateFirstName.trim().length >= 3) {
      setFirstNameIsValid(true);
    } else {
      setFirstNameInvalidMessage("3 or more characters");
      setFirstNameIsValid(false);
    }
  }, [stateFirstName]);

  // set form validity
  useEffect(() => {
    initiateFormValidation();
  }, [firstNameIsValid, lastNameIsValid, userNameIsValid, phoneNumberIsValid]);
  // lastName monitor
  useEffect(() => {
    if (stateLastName.trim().length >= 3) {
      setLastNameIsValid(true);
    } else {
      setLastNameIsValid(false);
      setLastNameInvalidMessage("3 or more characters");
    }
  }, [stateLastName]);
  //USER NAME MONITOR
  useEffect(() => {
    // Do some unique Identifier search
    if (userName.length > 3) {
      setUserNameValid(true);
      let url = `${SERVER_PORT}/api/user/unique-username?username=${userName}`;
      Axios.get(url, userName)
        .then(({ data }) => {
          console.log(data.unique);
          if (!data.unique) {
            setUserNameValid(false);
            setUserNameBlur(true);
            setUserNameInvalidMessage("Already Exists");
          } else {
            setUserNameValid(true);

            setUserNameInvalidMessage("");
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      setUserNameValid(false);
      setUserNameInvalidMessage("username must above 3 characters");
    }
  }, [userName]);
  //PHONE NUMBER MONITOR
  useEffect(() => {
    if (/^[0-9]{10}$/.test(phoneNumber)) {
      // return false;
      setPhoneNumberIsValid(true);
    } else {
      setPhoneNumberIsValid(false);
      setPhoneNumberInvalidMessage("Must be 11 digits");
    }
  }, [phoneNumber]);

  //    FUNCTIONS
  //HANDLE INPUT FOCUS OPERATIONS
  const focusHandler = (control, isFocus) => {
    if (control == "firstName") {
      toggleFirstNameFocus(!firstNameIsFocused);
      isFocus ? setFirstNameBlur(false) : setFirstNameBlur(true);
    } else if (control == "lastName") {
      toggleLastNameFocus(!lastNameIsFocused);
      !isFocus ? setLastNameBlur(true) : setLastNameBlur(false);
    } else if (control == "userName") {
      isFocus ? setUserNameBlur(false) : setUserNameBlur(true);
      toggleUserNameFocus(!userNameIsFocused);
    } else if (control == "phoneNumber") {
      !isFocus ? setPhoneNumberBlur(true) : setPhoneNumberBlur(false);
      togglePhoneNumberFocus(!phoneNumberIsFocused);
    }
  };
  function initiateFormValidation(returnSomething) {
    if (
      firstNameIsValid &&
      lastNameIsValid &&
      userNameIsValid &&
      phoneNumberIsValid
    ) {
      setFormValidity(true);
      if (returnSomething) return true;
    } else {
      setFormValidity(false);
      if (returnSomething) return false;
    }
  }
  //COMPONENT RETURN
  return (
    <div className={classes.AuthForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formIsValid = initiateFormValidation(true);
          if (formIsValid) {
            localSignupStepTwo(
              stateFirstName,
              stateLastName,
              userName,
              phoneNumber
            );
          } else {
            return;
          }
        }}
        className={classes.Form}
      >
        <div className={classes.preForm}>
          <h3>Account setup</h3>
          <p className={classes.smallWith}>Fill in your user information</p>
          <div className={classes.NameCont}>
            <InputWithShade
              customplaceholder="First Name"
              onFocus={() => focusHandler("firstName", true)}
              onBlur={() => focusHandler("firstName", false)}
              inputisfocus={firstNameIsFocused}
              value={stateFirstName}
              required
              invalidMessage={firstNameInvalidMessage}
              shouldupdate={firstNameIsBlurredOnce}
              validity={firstNameIsValid}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputWithShade
              customplaceholder="LastName"
              onFocus={() => focusHandler("lastName", true)}
              onBlur={() => focusHandler("lastName", false)}
              inputisfocus={lastNameIsFocused}
              value={stateLastName}
              required
              invalidMessage={lastNameInvalidMessage}
              shouldupdate={lastNameIsBlurredOnce}
              validity={lastNameIsValid}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputWithShade
            customplaceholder="Username"
            onFocus={() => focusHandler("userName", true)}
            onBlur={() => focusHandler("userName", false)}
            inputisfocus={userNameIsFocused}
            invalidMessage={userNameInvalidMessage}
            value={userName}
            required
            shouldupdate={userNameIsBlurredOnce}
            validity={userNameIsValid}
            onChange={(e) => setUserName(e.target.value)}
          />
          <SelectWithShade
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={Countries.countryCodes}
          />
          <InputWithShade
            customplaceholder="Phone"
            onFocus={() => focusHandler("phoneNumber", true)}
            onBlur={() => focusHandler("phoneNumber", false)}
            inputisfocus={phoneNumberIsFocused}
            value={phoneNumber}
            required
            invalidMessage={phoneNumberInvalidMessage}
            shouldupdate={phoneNumberIsBlurredOnce}
            validity={phoneNumberIsValid}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <SyselfButton disabled={!formValidity}>
          Next {isAuthenticatingLocal ? <SmallLoader /> : null}
        </SyselfButton>
      </form>
    </div>
  );
}

export default AuthForm2;
