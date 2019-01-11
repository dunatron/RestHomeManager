import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
// components
import RoutePanel from "../RoutePanel"
// Config
// import { adminRoutes } from "../../configs/adminRoutesConf"
import wizardRoutes from "../../routes/wizardRoutes"

// Redux
import { connect } from "react-redux"

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flex: "1 1 0",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: theme.spacing.unit * 4,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class WizardRoutes extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handlePageChange = path => {
    this.props.history.push(path)
  }

  _renderPanel = route => (
    <RoutePanel
      key={route.path}
      route={route}
      handleClick={() => this.handlePageChange(route.path)}
    />
  )

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { user, classes, history, match } = this.props
    const { role } = user

    if (!role) {
      return (
        <div>
          A role Must be set. Try logging out and back in. If this fails please
          contact your administrator
        </div>
      )
    }

    return (
      <div className={classes.root}>
        {wizardRoutes
          .filter(route => route.restricted.includes(role))
          .filter(route => route.panel)
          .map((route, routeIdx) => {
            return this._renderPanel(route)
          })}
      </div>
    )
  }
}

WizardRoutes.propTypes = {
  classes: PropTypes.object.isRequired,
}

const reduxWrapper = connect(state => ({
  user: state.user,
}))

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper
)(WizardRoutes)
