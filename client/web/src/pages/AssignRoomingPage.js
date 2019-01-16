import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "@material-ui/core/styles"
// containers
// import MorningStandup from "../containers/MorningStandup"
import AssignRoomingContainer from "../containers/AssignRoomingContainer"
// components

const styles = theme => ({
  root: {
    display: "flex",
  },
})

class AssignRoomingPage extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AssignRoomingContainer />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles, { withTheme: true })
)(AssignRoomingPage)
