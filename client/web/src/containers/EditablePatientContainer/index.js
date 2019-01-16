import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"
import LabelIcon from "@material-ui/icons/Label"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { difference } from "ramda"
// Mutations
import { PATIENT_QUERY } from "../../queries/getPatient"
//components

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  questionInput: {
    // maxWidth: "100%",
    width: "100%",
  },
  answerInput: {
    // maxWidth: "100%",
    width: "100%",
  },
  createAnswerInput: {
    // maxWidth: "100%",
    width: "100%",
  },
})
class EditablePatientContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
  }

  toggleEditing = bool => {
    this.setState({
      editing: bool,
    })
  }

  _getQueryVariables() {
    const where = {
      id: this.props.patientID,
    }
    const orderBy = "lastDayOfWork_ASC"
    return { where }
  }

  render() {
    const { classes } = this.props
    const { editing } = this.state
    // ToDo create rich getPatient query component card {id}
    // Will get everything dor the patient and will subscribe to tasks
    return (
      <Query
        query={PATIENT_QUERY}
        variables={this._getQueryVariables()}
        fetchPolicy="cache-and-network">
        {({ loading, error, data, subscribeToMore, fetchMore }) => {
          if (loading) {
            return (
              <div>
                <h1>Loading Patient Data</h1>
              </div>
            )
          }
          const {
            patient: { name, dob, careLevel, tasks, family, contacts },
          } = data
          return (
            <Card className={classes.card}>
              <Switch
                onChange={() => this.toggleEditing(!this.state.editing)}
                checked={this.state.editing}
              />

              <CardContent>
                <h1>{name}</h1>
                <p>{dob}</p>
                <p>{careLevel}</p>
              </CardContent>
              <CardActions>
                {editing && (
                  <Button size="small" onClick={() => this._update()}>
                    Update
                  </Button>
                )}
              </CardActions>
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  // graphql(UPDATE_QUESTION, { name: "updateStockQuestion" }),
  withApollo
)(EditablePatientContainer)
