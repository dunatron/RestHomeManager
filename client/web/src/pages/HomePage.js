import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// containers
// import MorningStandup from "../containers/MorningStandup"
import PanelRouterContainer from "../containers/PanelRouterContainer"
// components

class HomePage extends Component {
  render() {
    return (
      <div>
        <PanelRouterContainer />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(HomePage)