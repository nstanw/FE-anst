import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import "./Form.css";
import SignInForm from "./SingInForm";
import SignUpForm from "./SignUpForm";

class FormAuth extends Component {
  render() {
    return (
        <div className="">
          <div className="appAside" />
          <div className="appForm">
            <div className="formTitle">
              <NavLink
                to="/login/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/login/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

          </div>
        </div>

    );
  }
}

export default FormAuth;
