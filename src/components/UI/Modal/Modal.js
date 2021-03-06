import React from "react";
import Classes from "./modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
        <div
          className={Classes.Modal}
          style={{
            transform: this.props.show
              ? "translateY(-50%)"
              : "translateY(-1000vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
