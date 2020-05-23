import React from "react";
import classes from "./Toggler.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Toggler = (props) => {
  let Toggle = (
    <div onClick={props.clicked} className={classes.Toggler}>
      <div className={classes.CounterClockwise} />
      <div className={classes.Clockwise} />
      <div />
    </div>
  );
  if (props.isToggled) {
    Toggle = (
      <div onClick={props.clicked} className={classes.Close}>
        <FontAwesomeIcon
          size="2x"
          icon={faTimes}
          style={{
            color: "#fff",
          }}
        />
      </div>
    );
  }

  return Toggle;
};

export default Toggler;
