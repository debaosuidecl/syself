import React from 'react'
import classes from "./SmallLoader.module.css"
function SmallLoader() {
    return (
        <div className={classes["lds-ring"]}><div></div><div></div><div></div><div></div></div>
    )
}

export default SmallLoader
