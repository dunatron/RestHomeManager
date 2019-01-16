import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// components
import UsersList from "../components/UserSetup/UsersList"

class UserSetupPage extends Component {
  render() {
    return <UsersList />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(UserSetupPage)
