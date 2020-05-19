import React from 'react'
import classes from "./ErrorMessage.module.css"
function ErrorMessage({
    error
}) {
    
    return (
        <div className={classes.ErrorMessage}>
            <div className={classes.Left}>{error}</div>
            <div className={classes.Right}>x</div>
            
        </div>
    )
}

export default ErrorMessage
