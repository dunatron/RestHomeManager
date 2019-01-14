import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
import { ALL_USERS } from "../../queries/AllUsers"
import { Query } from "react-apollo"
import { Droppable, Draggable } from "react-beautiful-dnd"
// Components
import UserCard from "./UserCard"
// Queries
import { ALL_ORGANISATION_USERS } from "../../queries/allOrganisationUsers"
// Mutations
import { CHANGE_USER_ROLE } from "../../mutations/changeUserRole"

class UserList extends Component {
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
          query: ALL_ORGANISATION_USERS,
        },
      ],
    })
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

  render() {
    return (
      <Query query={ALL_USERS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          const { allUsers } = data

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Fragment>
                {allUsers.map((user, userIdx) => {
                  return (
                    <UserCard
                      key={userIdx}
                      user={user}
                      handleRoleChange={e => this._changeUserRole(e, user)}
                      setUserRole={role => this._setUserRole(role, user)}
                      // handleRoleChange={e => this._changeUserRole(e, user)}
                      removeOrg={orgId =>
                        this.props.removeOrgFromUser(orgId, user.id)
                      }
                    />
                  )
                })}
              </Fragment>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  graphql(CHANGE_USER_ROLE, { name: "changeUserRole" }),
  withRouter,
  withApollo
)(UserList)
