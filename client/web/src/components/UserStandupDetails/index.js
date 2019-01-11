import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, withApollo, compose } from "react-apollo"
import CircularProgress from "@material-ui/core/CircularProgress"
import { ROLE_OPTIONS, ROLE_PROJECT_MANAGER } from "../../constants"
// Components
import UserList from "./UserList"
import MultiSelect from "../Inputs/MultiSelect"
// Queries
import { ALL_USERS } from "../../queries/AllUsers.graphql"

class UserStandUpDetails extends Component {
  state = {
    filterRoles: [ROLE_PROJECT_MANAGER.value],
    // filterRoles: [],
  }
  render() {
    const {
      data: {
        allUsers,
        loading,
        error,
        fetchMore,
        refetch,
        startPolling,
        stopPolling,
        subScribeToMore,
        updateQuery,
        variables,
      },
    } = this.props

    if (loading) {
      return (
        <CircularProgress
          style={{ padding: 40 }}
          color="secondary"
          thickness={7}
        />
      )
    }

    if (error) {
      return "an error ocurred"
    }
    return (
      <div>
        <MultiSelect
          label="Select the user roles"
          values={this.state.filterRoles}
          handleChange={v => this.setState({ filterRoles: v })}
          options={ROLE_OPTIONS}
        />
        <UserList
          allUsers={allUsers.filter(u =>
            this.state.filterRoles.includes(u.role)
          )}
        />
      </div>
    )
  }
}

// export default compose(
//   withRouter,
//   withApollo
// )(UserStandUpDetails)

export default compose(
  graphql(ALL_USERS),
  withApollo
  // reduxWrapper
)(UserStandUpDetails)
