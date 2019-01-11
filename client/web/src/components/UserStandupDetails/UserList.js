import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"

//components
import UserCard from "./UserCard"

const styles = theme => ({
  container: {
    // padding: `${theme.spacing.unit * 2}px`,
    padding: theme.spacing.unit * 2,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
})

class UserList extends Component {
  render() {
    const { classes, allUsers } = this.props
    return (
      <div className={classes.container}>
        {allUsers && allUsers.map(user => <UserCard user={user} />)}
      </div>
    )
  }
}

export default withStyles(styles)(UserList)
