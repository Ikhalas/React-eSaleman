import React, { Component } from "react";
import { auth } from "./assets/api/firebase";

import Main from "./layouts/Main";
import LoginContainer from "./views/register-login/LoginContainer";

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
      <div>{currentUser ? <Main /> : <LoginContainer />}</div>
     
    ) : (
      <></>
    );
  }
}
