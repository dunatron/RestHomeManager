import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// // page layout
// import FullPage from "../layouts/FullPage"
// containers
import WizardContainer from "../containers/WizardContainer"

class WizardsPage extends Component {
  render() {
    return (
      <div>
        <WizardContainer />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(WizardsPage)