import React from "react";
import classes from "./SelectWithShade.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as F } from "@fortawesome/react-fontawesome";
import SelectShadeOption from "./SelectShadeOption";

function SelectWithShade(props) {
  return (
    <div className={classes.InputWithShade}>
      {/* <input {...props}
            style={
                {
                borderBottom: 
                    props.validity ?
                     "1px solid lightgreen": 
                     props.shouldupdate && !props.validity?
                      "1px solid crimson":"1px solid #bbb"                
            }
            }
            ></input> */}
      <select {...props}>
        {props.options &&
          props.options.map((option) => {
            return (
              <option value={option.dialling_code}>
                {option.country_name} ({option.dialling_code})
              </option>
            );
          })}
      </select>
      {/* {
            props.options && props.options.map(option=> {
             return   <SelectShadeOption option={option}/>
            })
        } */}
    </div>
  );
}

export default SelectWithShade;
