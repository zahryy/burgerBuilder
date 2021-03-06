import React from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SlideDrawer from "../../components/Navigation/SlideDrawer/SlideDrawer";
import Classes from "./Layout.module.css";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    showSlideDrawer: false
  };
  slideDrawerClosedHandler = () => {
    this.setState({ showSlideDrawer: false });
  };
  slideDrawerToggledHandler = () => {
    this.setState({ showSlideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          clicked={this.slideDrawerToggledHandler}
        />
        <SlideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSlideDrawer}
          closed={this.slideDrawerClosedHandler}
        />
        <main className={Classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
