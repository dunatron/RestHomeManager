import React, { Fragment, Component } from "react"
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
// GraphQL
import { graphql, compose, withApollo, Query } from "react-apollo"
import { ALL_USERS } from "../queries/AllUsers"
// components
import RoutePanel from "../components/RoutePanel/index"
// Config
import indexRoutes from "../routes/index"
import TextField from "../components/Inputs/TextInput"
import NumberInput from "../components/Inputs/NumberInput"
import BasicDatePicker from "../components/BasicDatePicker"
import MultiSelectChip from "../components/Inputs/MultiSelectChip"
import SelectOption from "../components/Inputs/SelectOption"
import {
  importTextField,
  importDatePicker,
  importSelectOption,
  importMultiSelectChip,
} from "../components/Inputs/imports/index"
import { CARE_LEVEL_OPTIONS } from "../constants"
// Redux
import { connect } from "react-redux"
import { updateInput } from "../actions/createPatientActions"

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flex: "1 1 0",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing.unit * 4,
  },
  fieldSet: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
})

class CreatePatientContainer extends Component {
  constructor(props) {
    super(props)
    // const { users } = props
  }

  render() {
    const { classes } = this.props
    console.log("createPatientContainer Props -> ", this.props)
    const fieldSet = this.renderFieldSet()

    return <div className={classes.root}>{fieldSet}</div>
  }

  renderFieldSet = () => {
    const {
      users: { allUsers, loading },
    } = this.props
    console.log("users ......=> ", allUsers)
    const {
      createPatient: {
        name,
        dob,
        careLevel,
        family,
        contacts,
        organisation,
        tasks,
      },
    } = this.props
    return (
      <div>
        <TextField
          id={"name"}
          label={"Name"}
          multiline={true}
          value={name}
          handleChange={v => this.handleInputChange("name", v)}
        />
        <BasicDatePicker
          handleDateChange={date =>
            this.handleInputChange("dob", date.format("DD MMMM YYYY"))
          }
          dateFormat={"DD MMMM YYYY"}
          selectedDate={dob}
          label={"Date of Birth"}
        />
        <SelectOption
          value={careLevel}
          label={"Care Level"}
          options={CARE_LEVEL_OPTIONS}
          handleChange={v => this.handleInputChange("careLevel", v)}
        />
        <MultiSelectChip
          values={family}
          label={"Family"}
          options={
            loading ? [] : allUsers.map(u => ({ name: u.name, value: u.id }))
          }
          handleChange={v => this.handleInputChange("family", v)}
        />
        <TextField
          id={"contacts"}
          label={"Contacts"}
          multiline={true}
          value={contacts}
          handleChange={v => this.handleInputChange("contacts", v)}
        />
        <TextField
          id={"organisation"}
          label={"Organisation"}
          multiline={true}
          value={organisation}
          handleChange={v => this.handleInputChange("organisation", v)}
        />
        <TextField
          id={"tasks"}
          label={"Tasks"}
          multiline={true}
          value={tasks}
          handleChange={v => this.handleInputChange("tasks", v)}
        />
        <button onClick={() => alert("Todo: Crreate ")}>Create Patient</button>
      </div>
    )
  }

  handleInputChange = (id, v) => {
    this.props.updateInput(id, v)
  }
}

CreatePatientContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const reduxWrapper = connect(
  state => ({
    //user: state.user,
    createPatient: state.createPatient,
  }),
  dispatch => ({
    updateInput: (name, value) => dispatch(updateInput(name, value)),
  })
)

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  reduxWrapper,
  withApollo,
  // graphql(ALL_USERS)
  graphql(ALL_USERS, { name: "users" })
)(CreatePatientContainer)
