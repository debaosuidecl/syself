import React, { Component } from "react";
import classes from "./Modal.module.css";
// import Aux from "../../../hoc/myAux/myAux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProp, nextState) {
    return (
      nextProp.show !== this.props.show ||
      nextProp.children !== this.props.children
    );
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.removeModal} />
        <div
          className={classes.Modal}
          style={{
            pointerEvents: this.props.show ? "" : "none",
            transform: this.props.show
              ? "translate(-50%, -50%)"
              : "translate(-50%, -120%)",
            // transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
