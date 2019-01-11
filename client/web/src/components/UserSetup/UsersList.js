import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// import { ALL_USERS } from "../../queries/allUsers"
import { ALL_USERS } from "../../queries/AllUsers.js"
import { Query } from "react-apollo"
// Components
import UserCard from "./UserCard"
// Mutations
import { CHANGE_USER_ROLE } from "../../mutations/changeUserRole.js"
// Github has been ysuin tron silver...sdf df sdfsdfs
class UsersList extends Component {
  _getQueryVariables = () => {
    const idFromPath = this.props.location.pathname.split("/")[2] // this is highly unstable, change asap

    const id = idFromPath

    return { id }
  }

  _setUserRole = async (role, user) => {
    //1. if false change the role to GUEST
    //2. if true change the role to ADMIN

    await this.props.changeUserRole({
      variables: {
        id: user.id,
        role: role,
      },
      refetchQueries: [
        {
          query: ALL_USERS,
          // variables: {
          //   ID: MethodID,
          // },
        },
      ],
    })
  }

  _changeUserRole = async (e, user) => {
    //1. if false change the role to GUEST
    //2. if true change the role to ADMIN
    let newRole
    if (e.target.checked === true) {
      newRole = "ADMIN"
    } else {
      newRole = "USER"
    }

    await this.props.changeUserRole({
      variables: {
        id: user.id,
        role: newRole,
      },
      refetchQueries: [
        {
          query: ALL_USERS,
          // variables: {
          //   ID: MethodID,
          // },
        },
      ],
    })
  }

  render() {
    return (
      <Query query={ALL_USERS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { allUsers } = data

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {allUsers &&
                allUsers.map(user => {
                  return (
                    <UserCard
                      key={user.id}
                      user={user}
                      setUserRole={role => this._setUserRole(role, user)}
                      handleRoleChange={e => this._changeUserRole(e, user)}
                    />
                  )
                })}
            </div>
          )
        }}
      </Query>
    )
  }
}

// export default compose(
//   //graphql(VOTE_MUTATION, { name: "upVoteMutation" }),
//   withApollo
// )(SingleDocumentContainer)

export default compose(
  graphql(CHANGE_USER_ROLE, { name: "changeUserRole" }),
  withRouter,
  withApollo
)(UsersList)
