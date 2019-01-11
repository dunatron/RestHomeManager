import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import DoneIcon from "@material-ui/icons/Done"
import { NOMOS_USER_ROLES } from "../../constants"
// GraphQL
import { graphql, withApollo, compose } from "react-apollo"
// Mutations
// import CREATE_STANDUP_DETAILS from "../../mutations/CreateStandupDetails.graphql"
import { CREATE_STANDUP_DETAIL } from "../../mutations/CreateStandDetail.graphql"

// components
import Timer from "../Timer/index"
import TextInput from "../Inputs/TextInput"

const styles = theme => ({
  card: {
    minWidth: 275,
    borderRadius: 0,
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,

    // flexGrow: 1,
  },
  doneStrip: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.unit * 2,
  },
  doneText: {
    padding: theme.spacing.unit,
  },
})

class UserCard extends Component {
  state = {
    notes: null,
    finished: false,
    uploading: false,
    timeTaken: 0,
  }

  handleNotesChange = val => {
    this.setState({
      notes: val,
    })
  }

  _updateUserStandup = () => {
    this.setState({
      finished: true,
    })
  }
  updateTimeTaken = t => {
    this.setState({
      timeTaken: t,
    })
  }

  _createStandupDetails = async () => {
    // UPDATE_SECTION_MUTATION
    await this.setState({
      uploading: true,
    })
    await this.props.createStandupDetail({
      variables: {
        userId: this.props.user.id,
        timeTake: this.state.timeTaken,
        notes: this.state.notes,
      },
    })
    this.setState({
      uploading: false,
      finished: true,
    })
  }

  getRoleName = role => {
    const userRole = NOMOS_USER_ROLES.find(r => r.value === role)
    return userRole.name
  }

  render() {
    const {
      classes,
      handleClick,
      user: { id, name, email, role },
    } = this.props
    const { notes, finished, timeTaken } = this.state

    if (finished) {
      return (
        <Card className={classes.card}>
          <div className={classes.doneStrip}>
            <DoneIcon color="secondary" />
            <span className={classes.doneText}>
              {name} - {timeTaken} - {notes}
            </span>
          </div>
        </Card>
      )
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            gutterBottom
            variant="title"
            component="h1"
            color="primary">
            {name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="p">
            {/* {role} */}
            {this.getRoleName(role)}
          </Typography>
          {/* <Typography gutterBottom variant="subheading" component="p">
            {email}
          </Typography> */}
          <Timer timeTaken={t => this.updateTimeTaken(t)} />
          <TextInput
            label="Notes"
            value={notes}
            handleChange={v => this.handleNotesChange(v)}
          />
        </CardContent>
        <CardActions>
          {finished ? (
            <div>
              <DoneIcon />
            </div>
          ) : (
            <Button
              size="small"
              onClick={() => this._createStandupDetails()}
              color={"primary"}>
              Finish Rant
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

// export default withStyles(styles)(UserCard)
export default compose(
  withStyles(styles),
  graphql(CREATE_STANDUP_DETAIL, { name: "createStandupDetail" }),
  withApollo
)(UserCard)
