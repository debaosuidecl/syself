//@ts-nocheck
import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
import { SERVER_PORT } from "../components/Global/Global";
export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [token, setToken] = useState("");
  const [usertype, setUserType] = useState("");
  const [loading, setLoadingState] = useState(false);
  const [isAuthenticatingLocal, setAuthenticationLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [regComplete, setRegComplete] = useState(false);
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState([]);
  const [location, setLocation] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(1);

  //    SET ERROR TO NULL
  const setErrorToEmptyArray = () => {
    setTimeout(() => {
      setErrors([]);
    }, 5000);
  };
  //   EFFECTS
  useEffect(() => {
    // CANCEL ERROR REMOVALSUBSCRIPTIONS
    return () => clearTimeout(setErrorToEmptyArray);
  }, []);

  const logOut = async () => {
    return new Promise((res, rej) => {
      setToken("");
      localStorage.removeItem("j");
      res("done");
    });
  };
  const setRegStatus = (value) => setRegistrationStatus(value);
  const localSignupStepOne = async (email, password, acceptsPrivacyTerms) => {
    setAuthenticationLoading(true);
    let url = `${SERVER_PORT}/api/auth/local`;
    axios
      .post(url, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data == null) {
          // setErrors([...errors, "invalid token"])
          // localStorage.removeItem("j")
          setAuthenticationLoading(false);
          return console.log(errors);
        }
        const { token } = response.data;

        setToken(token);
        localStorage.setItem("j", token);
        setAuthenticationLoading(false);
        setRegistrationStatus(2);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
          setErrorToEmptyArray();
          console.log(error.response.data);
          setAuthenticationLoading(false);
        }
      });
  };
  const localSignin = async (email, password) => {
    return new Promise((resolve, reject) => {
      let url = `${SERVER_PORT}/api/auth/signin-local`;
      setAuthenticationLoading(true);

      axios
        .post(url, {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          setAuthenticationLoading(false);

          if (response.data == null) {
            reject("returned as null");
            setAuthenticationLoading(false);
            return console.log(errors);
          }
          const { token } = response.data;
          localStorage.setItem("j", token);
          setToken(token);
          setAuthenticationLoading(false);
          resolve({ token, regComplete: response.data.regComplete });
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          setAuthenticationLoading(false);
          if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
            setErrorToEmptyArray();
            console.log(error.response.data);
            setAuthenticationLoading(false);
            reject(error.response.data.errors);
          }
        });
    });
  };
  const finalRegisteration = async () => {
    return new Promise((res, rej) => {
      const token = localStorage.getItem("j");
      setAuthenticationLoading(true);
      if (!token) {
        console.log("not seen token");
        setLoadingState(false);
        setLoadedOnce(true);

        //  setErrors([...errors, "invalid token"])
        console.log(errors);
      } else {
        let config = {
          headers: {
            "x-auth-token": token,
          },
        };
        let url = `${SERVER_PORT}/api/auth/final-reg-step`;
        axios
          .post(
            url,
            {
              firstName,
              lastName,
              userName,
              phoneNumber,
              email,
              location,
              usertype: usertype,
            },
            config
          )
          .then((response) => {
            // console.log(response);
            if (response.data == null) {
              setAuthenticationLoading(false);
              rej(errors);
              return console.log(errors);
            }
            const { success } = response.data;

            res(success);
            setAuthenticationLoading(false);
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response) {
              setErrors(error.response.data.errors);
              setErrorToEmptyArray();
              rej(error.response.data);
              setAuthenticationLoading(false);
            }
          });
      }
    });
    setAuthenticationLoading(true);
  };
  const authenticate = async (unprotected) => {
    //    if (noneedtoauth)
    if (unprotected) {
      setLoadingState(false);
      setLoadedOnce(true);
    } else {
      setLoadingState(true);
    }
    const token = localStorage.getItem("j");
    if (!token) {
      console.log("not seen token");
      setLoadingState(false);
      setLoadedOnce(true);
      console.log(errors);
    } else {
      let config = {
        headers: {
          "x-auth-token": token,
        },
      };
      let url = `${SERVER_PORT}/api/auth`;
      axios
        .get(url, config)
        .then((response) => {
          console.log(response);
          if (response.data == null) {
            setErrors([...errors, "invalid token"]);
            localStorage.removeItem("j");
            setLoadingState(false);
            setLoadedOnce(true);

            return console.log(errors);
          }
          const {
            email,
            _id,
            firstName,
            lastName,
            avatar,
            registrationStep,
            regComplete,
            usertype,
          } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setAvatar(avatar);
          setEmail(email);
          setToken(token);
          setId(_id);
          setUserType(usertype);
          setRegComplete(regComplete);
          setRegistrationStatus(registrationStep);
          setTimeout(() => {
            setLoadingState(false);
            setLoadedOnce(true);
          }, 2000);
        })

        .catch((error) => {
          console.log(error);
          if (error.response && error.response.data) {
            if (error.response.data.errors) {
              setErrors(error.response.data.errors);
            }
            setLoadingState(false);
            setLoadedOnce(true);
          }
        });
    }
    console.log(errors);
  };
  const goToStep3 = (firstName, lastName, userName, phoneNumber) => {
    setFirstName(firstName);
    setLastName(lastName);
    setUserName(userName);
    setPhoneNumber(phoneNumber);
    setRegistrationStatus(3);
  };
  const ipSearch = async () => {
    const { data } = await axios.get("https://ip.nf/me.json");
    console.log(data.ip.country);
    console.log(data.ip);
    const dailingData = await axios.post(`${SERVER_PORT}/api/auth/get_ip`, {
      country_code: data.ip.country_code,
    });
    console.log(dailingData.data);
    setLocation(dailingData.data.country_code);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        localSignin,
        firstName,
        lastName,
        email,
        avatar,
        setUserType,
        usertype,
        regComplete,
        location,
        userNameContext: userName,
        loadedOnce,
        setRegStatus,
        ipSearch,
        errors,
        logOut,
        phoneNumberContext: phoneNumber,
        registrationStatus: registrationStatus,
        authFunc: authenticate,
        localSignupStepTwo: goToStep3,
        localSignupStepOne: localSignupStepOne,
        isAuthenticatingLocal,
        finalRegisteration,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
