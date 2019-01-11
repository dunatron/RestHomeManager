import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { compose, withApollo } from "react-apollo"
// Components
import WizardRoutes from "../components/WizardRoutes/index"

class WizardContainer extends Component {
  render() {
    return (
      <div>
        <WizardRoutes />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(WizardContainer)