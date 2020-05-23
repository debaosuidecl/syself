import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Auth.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import SignUpImage from "../../images/signupimagepage1.png";
import SignUpImage2 from "../../images/regpage2.png";
import SignUpImage3 from "../../images/regpage3.png";
import SignInImage from "../../images/signinimage.png";
import ModalImage from "../../images/modalimage.png";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthForm2 from "../../components/AuthForm2/AuthForm2";
import AuthForm3 from "../../components/AuthForm3/AuthForm3";
import SyselfButton from "../../components/SyselfButton/SyselfButton";
import SmallLoader from "../../components/SmallLoader/SmallLoader";
import Modal from "../../components/Modal/Modal";
import AuthFormSignIn from "../../components/AuthFormSignIn/AuthFormSignIn";

function Auth(props) {
  const {
    registrationStatus,
    setRegStatus,
    email,
    firstName,
    lastName,
    userNameContext,
    phoneNumberContext,
    isAuthenticatingLocal,
    finalRegisteration,
    usertype,
    regComplete,
    setUserType,
  } = useContext(AuthContext);
  //states
  const [showModal, showModalhandler] = useState(true);

  // effects
  useEffect(() => {
    // if (regComplete) {
    //   props.history.push("/");
    // }
  }, []);
  useEffect(() => {
    // if (registrationStatus == 2 && !showModal) {
    //   showModalhandler(true);
    // } else if ((registrationStatus == 2) & showModal) {
    //   showModalhandler(false);
    // }
  });

  console.log(registrationStatus, "from auth");

  let authStage = (
    // <AuthContext
    <div className={classes.Auth}>
      <div
        className={
          registrationStatus == 1
            ? [classes.LeftGraphicCont].join(" ")
            : registrationStatus == 2
            ? classes.LeftGraphicCont
            : classes.LeftGraphicCont
        }
      >
        <div className={classes.DownFade2}>
          <AuthFormSignIn />
        </div>
      </div>
      <div className={[classes.RightCont, classes.desktopOnly].join(" ")}>
        <div className={classes.UpFade3}>
          <img src={SignInImage} style={{ width: "80%" }} />
        </div>
      </div>
    </div>
  );
  const returnNull = () => {
    return "";
  };
  return (
    <Layout>
      {registrationStatus !== 2 ? null : (
        <Modal show={showModal} removeModal={() => showModalhandler(false)}>
          <div className={classes.WelcomeCont}>
            <img src={ModalImage} height="140" />
            <h1>
              Welcome to <span style={{ fontWeight: 900 }}>syself</span>
            </h1>
            <h3>{firstName || email}</h3>
            <p>
              You are almost there, create your <strong>syself</strong> profile
            </p>
            <SyselfButton onClick={() => showModalhandler(false)}>
              Next
            </SyselfButton>
          </div>
        </Modal>
      )}
      {registrationStatus > 1 ? (
        <div className={classes.NavIndicator}>
          <div
            className={classes.Step1}
            onClick={() => {
              // setRegStatus(2)
            }}
            style={{
              background: registrationStatus === 2 ? "#141b4d" : "#bbb",
              tranistion: "1s",
              // border: "#141b4d"
            }}
          ></div>
          {/* <div className={classes.linebetween}
                style={{
                    height: 1,
                    background: "#bbb",
                    flex:2
                }}
            ></div> */}
          <div
            className={classes.Step2}
            onClick={() => {
              if (
                firstName &&
                lastName &&
                userNameContext &&
                phoneNumberContext
              ) {
                // setRegStatus(3)
              } else {
                console.log(
                  firstName,
                  lastName,
                  userNameContext,
                  phoneNumberContext
                );
                return console.log("incomplete entry");
              }
            }}
            style={{
              tranistion: "1s",
              background: registrationStatus === 3 ? "#141b4d" : "#bbb",
              // border: "#141b4d"
            }}
          ></div>
          {/* <input  onChange={(e)=>setinput(e.target.value)} value={inputtest}/>
               <button onClick={()=>setRegStatus(inputtest)}>change regStatus</button> */}
        </div>
      ) : null}
      <div className={classes.RegistrationCont}>{authStage}</div>

      {registrationStatus === 3 ? (
        <>
          <div className={classes.ButtonFinal}>
            <SyselfButton
              disabled={!usertype}
              onClick={() => {
                finalRegisteration()
                  .then((res) => {
                    console.log(res);
                    // props.history.push("/dashboard");
                    window.location.href = "/dashboard";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Save and Continue to Dashboard
              {isAuthenticatingLocal ? <SmallLoader /> : null}
            </SyselfButton>
          </div>
        </>
      ) : null}
    </Layout>
  );
}

export default withRouter(Auth);
