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

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

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
