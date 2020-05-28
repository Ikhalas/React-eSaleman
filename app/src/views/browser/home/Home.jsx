import React, { Component } from "react";
import { auth } from "../../../assets/api/firebase";
import Header from '../../../components/browser/Header'
import UserProfile from "./components/UserProfile";
import UserProduct from "./components/UserProduct";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted && this.setState({ currentUser: user })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <>
      <Header />
        <div className="regular-th" style={{ backgroundColor: "#f5f5f5" }}>
          {currentUser ? (
            <>
              <UserProfile userid={currentUser.uid} />
              <br />
              <UserProduct userid={currentUser.uid} />
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}
