import React, { Component } from "react"
import { AUTH_TOKEN, ORGANISATION_ID } from "./constants"
import { Switch, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import "./App.css"

// components always loaded
import Login from "./components/Login/index"

// Menu
import AppBarContainer from "./containers/AppBarContainer"

import indexRoutes from "./routes/index"

import UserSetupPage from "./pages/UserSetupPage"

import SetOrganisation from "./components/SetOrganisation/index"

class App extends Component {
  render() {
    const { history } = this.props
    const { pathname } = history.location
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const orgId = localStorage.getItem(ORGANISATION_ID)

    if (!orgId && pathname !== "/setorg") {
      this.props.history.push("/setorg")
      // return (
      //   <div>
      //     <SetOrganisation />
      //   </div>
      // )
    }

    if (!authToken) {
      return (
        <div>
          <Login />
        </div>
      )
    }

    return (
      <div className="center w85">
        {/* <Header /> */}
        <AppBarContainer />
        <div>
          <Switch>
            <Route exact path="/setorg" component={SetOrganisation} />
            {indexRoutes.map((prop, key) => {
              return (
                <Route
                  exact
                  path={prop.path}
                  component={prop.component}
                  key={prop.path}
                />
              )
            })}
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
