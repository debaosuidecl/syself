//@ts-nocheck
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon as F } from "@fortawesome/react-fontawesome";

import classes from "./UserTypeFlow.module.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function UserTypeFlow({ firstName, usertype }) {
  return (
    <div className={classes.UserTypeFlow}>
      <div className={classes.FlowCard}>
        <F icon={faArrowLeft} className={classes.Arrow} />
      </div>
      <div className={classes.BlurDropShadow}></div>
    </div>
  );
}

export default UserTypeFlow;
