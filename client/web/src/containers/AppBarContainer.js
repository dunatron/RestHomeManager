import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { compose } from "react-apollo/index"
// Components
import BackButton from "../components/BackButton/index"
// Menus
import LongMenu from "../components/LongMenu/index"
import AccountMenu from "../components/AccountMenu/index"
// Config
// import routesConf from "../configs/routesConf"
import indexRoutes from "../routes/index"
// Redux
import { connect } from "react-redux"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class AppBarContainer extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  logoutUser = () => {
    //this.props.logoutUser()
    this.props.history.push(`/`)
    //const authToken = localStorage.getItem(AUTH_TOKEN)
    localStorage.removeItem(AUTH_TOKEN)
  }

  handlePageChange = url => {
    this.handleClose()
    this.props.history.push(url)
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { classes, history, match, user } = this.props
    const { role } = user

    const { pathname } = history.location

    //          .filter(route => route.restricted.includes(role))

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {pathname && pathname !== "/" && <BackButton />}
            <div>[DEV DASHBOARD]</div>
            <LongMenu
              items={indexRoutes
                .filter(route => route.restricted.includes(role))
                .filter(route => route.main)}
            />

            <AccountMenu logoutUser={() => this.logoutUser()} />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const reduxWrapper = connect(state => ({
  user: state.user,
}))

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper
)(AppBarContainer)