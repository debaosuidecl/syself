import React from 'react'
import classes from "./SelectWithShade.module.css"
function SelectShadeOption(props) {
    return (
        <div className={classes.ShadeOption}>
            <p>{props.option}</p>
        </div>
    )
}

export default SelectShadeOption
