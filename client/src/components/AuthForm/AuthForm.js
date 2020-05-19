import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputWithShade from "../InputWithShade/InputWithShade";
import classes from "./AuthForm.module.css";
import Img from "../../images/Gmailicon.png";
import SyselfButton from "../SyselfButton/SyselfButton";
import { SERVER_PORT } from "../Global/Global";
import SimpleReactValidator from "simple-react-validator";
import SmallLoader from "../SmallLoader/SmallLoader";
import * as EmailValidator from "email-validator";
function AuthForm() {
  // CONTEXTS
  const { localSignupStepOne, isAuthenticatingLocal } = useContext(AuthContext);

  //    STATE
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailIsFocused, toggleEmailFocus] = useState(false);
  const [privacyAccepted, privacyChange] = useState(false);
  const [passwordIsFocused, togglePasswordFocus] = useState(false);
  const [passwordIsBlurredOnce, setPasswordBlurOnce] = useState(false);
  const [emailBlurredOnce, setEmailBlurOnce] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordishidden, hidepassword] = useState("password");
  // EFFECTS

  useEffect(() => {
    // if(emailBlurredOnce)
    setEmailValid(EmailValidator.validate(email));
  }, [email]);
  useEffect(() => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    // var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    // if(passwordIsBlurredOnce)
    setPasswordValid(strongRegex.test(password));
  }, [password]);

  //    FUNCTIONS
  const focusHandler = (control) => {
    if (control == "email") {
      setEmailBlurOnce(true);

      toggleEmailFocus(!emailIsFocused);
    } else {
      setPasswordBlurOnce(true);
      togglePasswordFocus(!passwordIsFocused);
    }
  };

  //COMPONENT RETURN
  return (
    <div className={classes.AuthForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          localSignupStepOne(email, password, privacyAccepted);
        }}
        className={classes.Form}
      >
        <div className={classes.preForm}>
          <h3>Sign Up</h3>
          <p className={classes.smallWith}>with</p>
          <div className={classes.GoogleFacebookCont}>
            <div className={classes.Google}>
              <a href={`${SERVER_PORT}/api/auth/oauth/google`}>
                <img src={Img} height={40} />
              </a>
              <p>Gmail</p>
            </div>
            <div className={classes.Facebook}>
              <a href={`${SERVER_PORT}/api/auth/facebook`}>
                <i
                  className="fab fa-facebook"
                  style={{ fontSize: 40, marginBottom: 2 }}
                ></i>
              </a>

              <p>Facebook</p>
            </div>
          </div>
        </div>

        <InputWithShade
          customplaceholder="Email address"
          onFocus={() => focusHandler("email")}
          onBlur={() => focusHandler("email")}
          inputisfocus={emailIsFocused}
          value={email}
          required
          type="email"
          shouldupdate={emailBlurredOnce}
          validity={emailValid}
          onChange={(e) => setemail(e.target.value)}
        />
        {/* {Validator.message('title', email, 'required|email')} */}
        <InputWithShade
          customplaceholder="Password"
          onBlur={() => focusHandler("password")}
          onFocus={() => focusHandler("password")}
          inputisfocus={passwordIsFocused}
          value={password}
          shouldupdate={passwordIsBlurredOnce}
          validity={passwordValid}
          ispassword={true}
          revealpassword={() => {
            console.log("text");
            hidepassword("text");
          }}
          hidepassword={() => hidepassword("password")}
          type={passwordishidden}
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <div className={classes.privacyPolicy}>
          <input
            type="checkbox"
            required
            checked={privacyAccepted}
            onChange={() => privacyChange(!privacyAccepted)}
          />
          <b>I accept the terms of use and privacy policy</b>
        </div>
        <SyselfButton disabled={isAuthenticatingLocal}>
          Sign up {isAuthenticatingLocal ? <SmallLoader /> : null}
        </SyselfButton>
      </form>
      <p style={{ color: "#bbb" }}>
        Already have an account?{" "}
        <a
          href="/sign-in"
          style={{
            color: "#ec6b67",
          }}
        >
          Login here
        </a>{" "}
      </p>
    </div>
  );
}

export default AuthForm;
