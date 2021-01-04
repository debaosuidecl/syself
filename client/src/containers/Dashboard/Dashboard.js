//@ts-nocheck
import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Dashboard.module.css";
import { AuthContext } from "../../context/AuthContext";
import Skeletor from "../../components/LoadingSkeleton/LoadingSkeleton";
import UserTypeFlow from "../UserTypeFlow/UserTypeFlow";
function Dashboard() {
  const { regComplete, firstName, usertype } = useContext(AuthContext);
  return (
    <Layout>
      <UserTypeFlow firstName={firstName} usertype={usertype} />
      <div className={classes.SkeletonCont}>
        <Skeletor />
      </div>
    </Layout>
  );
}

export default Dashboard;
