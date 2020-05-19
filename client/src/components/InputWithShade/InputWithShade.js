import React from 'react'
import classes from './InputWithShade.module.css'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as F  } from '@fortawesome/react-fontawesome';



function InputWithShade(props) {
    let placeholderStyle = {
        top: props.inputisfocus? 3: props.value? 3: 22,
        fontSize: props.inputisfocus? 10: props.value? 10:  16,
        left: 7
    }
    return (
        <>
        
        <div className={classes.InputWithShade} >
        {<div className={classes.ErrorMessage}
        style={{
            opacity: props.shouldupdate && !props.validity? 1: 0,
            transition: ".5s"
        }}
        >
            <span>{props.invalidMessage}</span>
        </div>}
            <p
            style={placeholderStyle}
            
            >{props.customplaceholder}</p>
            <input {...props}
            style={
                {
                borderBottom: 
                    props.validity ?
                     "1px solid lightgreen": 
                     props.shouldupdate && !props.validity?
                      "1px solid crimson":"1px solid #bbb"                
            }
            }
            ></input>
            {props.ispassword?(
                props.type=="password"?
             <F icon={faEye} onClick={props.revealpassword}/>: <F icon={faEyeSlash} onClick={props.hidepassword}/>)
             : null}
        </div>
        
        </>
    )
}

export default InputWithShade
