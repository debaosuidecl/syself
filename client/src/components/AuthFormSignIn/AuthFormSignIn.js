import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputWithShade from "../InputWithShade/InputWithShade";
import classes from "./AuthFormSignIn.module.css";
import Img from "../../images/Gmailicon.png";
import SyselfButton from "../SyselfButton/SyselfButton";
import { SERVER_PORT } from "../Global/Global";
import SimpleReactValidator from "simple-react-validator";
import SmallLoader from "../SmallLoader/SmallLoader";
import * as EmailValidator from "email-validator";
function AuthFormSignIn() {
  // CONTEXTS
  const { localSignin, isAuthenticatingLocal } = useContext(AuthContext);

  //    STATE
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailIsFocused, toggleEmailFocus] = useState(false);
  const [passwordIsFocused, togglePasswordFocus] = useState(false);
  const [passwordIsBlurredOnce, setPasswordBlurOnce] = useState(false);
  const [emailBlurredOnce, setEmailBlurOnce] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordishidden, hidepassword] = useState("password");
  // EFFECTS

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
          localSignin(email, password).then(({ token, regComplete }) => {
            window.location.href = `http://localhost:3000/s-catch?signup-method=local&ctb-rel=jy20rolle&j=
        ${token}&status=${regComplete}`;
          });
        }}
        className={classes.Form}
      >
        <div className={classes.preForm}>
          <h3>Sign in</h3>
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
          shouldupdate={false}
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
          shouldupdate={false}
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

        <SyselfButton disabled={isAuthenticatingLocal}>
          Sign in {isAuthenticatingLocal ? <SmallLoader /> : null}
        </SyselfButton>
      </form>
      <p style={{ color: "#bbb" }}>
        Don't have an account?{" "}
        <a
          href="/register"
          style={{
            color: "#ec6b67",
          }}
        >
          sign up here
        </a>{" "}
      </p>
    </div>
  );
}

export default AuthFormSignIn;
