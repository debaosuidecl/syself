import React from 'react'
import classes from "./SyselfButton.module.css";
function SyselfButton(props) {

    return (
       <button className={classes.SyselfButton} {...props}
       style={{

           width: props.isfullwidth? "100%": 109
       }
    }
       >
           {props.children}
       </button>
    )
}

export default SyselfButton
