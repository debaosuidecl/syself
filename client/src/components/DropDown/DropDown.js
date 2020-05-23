import React, { useState } from "react";
import classes from "../Layout/Layout.module.css";
function DropDown({ routes, isToggled }) {
  return (
    <ul
      className={classes.DropDownBody}
      style={{
        pointerEvents: isToggled ? undefined : "none",
        opacity: isToggled ? "1" : "0",
        transform: isToggled ? "translateY(0)" : "translateY(-50px)",
        transition: ".2s",
      }}
    >
      {routes.map((l) => {
        {
          if (l.show)
            return (
              <li>
                <a href={l.link}>{l.name}</a>
              </li>
            );
          else return null;
        }
      })}
    </ul>
  );
}

export default DropDown;
