import React, { Component } from 'react'
import Main from './layouts/Main'
import Login from './layouts/Login'

export default class App extends Component {
  render() {
    return (
      <div>
        {/*{this.state.currentUser ? <Main/> : <Login />} login condition*/}
        <Main />
      </div>
    )
  }
}
