import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { auth } from "./assets/api/firebase";

import MainBrowser from "./layouts/MainBrowser";
import MainMobile from "./layouts/MainMobile"
import LoginContainer from "./views/browser/register-login/LoginContainer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      readyForRender: false,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.checkSession();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkSession() {
    auth.onAuthStateChanged((user) => {
      user
        ? this.setState({ currentUser: user, readyForRender: true })
        : this.setState({ currentUser: null, readyForRender: true });
    });
  }

  render() {
    const { currentUser, readyForRender } = this.state;
    return readyForRender ? (
      <div>
        {currentUser ? (
          <>{isMobile ? <MainMobile /> : <MainBrowser />}</>
        ) : (
          <LoginContainer />
        )}
      </div>
    ) : (
      <></>
    );
  }
}
