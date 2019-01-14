import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// containers
// import MorningStandup from "../containers/MorningStandup"
import CreatePatientContainer from "../containers/CreatePatientContainer"
// components

class CreatePatientPage extends Component {
  render() {
    return (
      <div>
        <CreatePatientContainer />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(CreatePatientPage)
