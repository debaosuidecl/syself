import React, { useContext, useEffect } from "react";
import "./App.css";
// import Layout from './components/Layout/Layout';
import {
  BrowserRouter,
  Route,
  withRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import SocialFetch from "./containers/SocialFetch/SocialFetch.js";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import SelectUserType from "./containers/SelectUserType/SelectUserType";
import Home from "./containers/Home/Home";
import Dashboard from "./containers/Dashboard/Dashboard";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ErroPage from "./containers/ErrorPage/ErroPage";
import Logout from "./containers/Logout/Logout";
import Signin from "./containers/Auth/Signin";
function App(props) {
  // const { loading } = useContext(AuthContext);
  const {
    authFunc,
    loading,
    token,
    errors,
    ipSearch,
    loadedOnce,
    regComplete,
  } = useContext(AuthContext);
  const protectedRoutes = {
    "/dashboard": 1,
  };
  // const
  console.log(regComplete, "reg is complete");
  // USE EFFECT TO AUTHENTICATE BEFORE  A
  useEffect(() => {
    console.log(window.location.href);
    console.log("start effect");
    ipSearch();
    console.log(props);
    authFunc();
  }, []);
  let nonauthroutes = (
    <BrowserRouter>
      <Switch>
        <Route path="/register" exact component={Auth} />
        <Route path="/sign-in" exact component={Signin} />
        <Route path="/s-catch" exact component={SocialFetch} />
        <Route path="/" exact component={Home} />
        <Route path="/logout" exact component={Logout} />

        <Route render={() => <h1>Page Not Available</h1>} />
      </Switch>
    </BrowserRouter>
  );
  let authRoutes = (
    <BrowserRouter>
      <Switch>
        <Route path="/s-catch" exact component={SocialFetch} />
        <Route path="/register-user-type" exact component={SelectUserType} />
        <Route path="/dashboard" exact component={Dashboard} />
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/logout" exact component={Logout} />

        <Route render={() => <ErroPage />} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
  // return loading ? <p>loading</p> : routes;
  return loading && !loadedOnce ? (
    <LoadingScreen />
  ) : regComplete && !loading && loadedOnce ? (
    authRoutes
  ) : !regComplete && !loading && loadedOnce ? (
    nonauthroutes
  ) : null;
}

export default App;
