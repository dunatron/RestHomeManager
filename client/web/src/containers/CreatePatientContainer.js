import React, { Fragment, Component } from "react"
import moment from "moment"
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/
import PropTypes from "prop-types"
import { AUTH_TOKEN } from "../constants"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
// GraphQL
import { graphql, compose, withApollo, Query } from "react-apollo"
// Queries
import { ALL_USERS } from "../queries/AllUsers"
// Mutations
import { CREATE_PATIENT } from "../mutations/createPatient"
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
    // const {
    //   users: { allUsers, loading },
    // } = this.props
    // console.log("users ......=> ", allUsers)
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
      users: { allUsers, loading },
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
          values={family ? family : []}
          label={"Family"}
          options={
            allUsers ? allUsers.map(u => ({ name: u.name, value: u.id })) : []
          }
          handleChange={v => this.handleInputChange("family", v)}
        />
        {/* <TextField
          id={"contacts"}
          label={"Contacts"}
          multiline={true}
          value={contacts}
          handleChange={v => this.handleInputChange("contacts", v)}
        /> */}
        <TextField
          id={"organisation"}
          label={"Organisation"}
          multiline={true}
          value={organisation}
          handleChange={v => this.handleInputChange("organisation", v)}
        />

        <button onClick={() => this._createPatient()}>Create Patient</button>
      </div>
    )
  }

  handleInputChange = (id, v) => {
    this.props.updateInput(id, v)
  }

  _createPatient = async () => {
    const newPatient = await this.props.createPatientMutation({
      variables: {
        // userId: this.props.user.id,
        // lastDayOfWork: moment(this.state.lastDayOfWork).format(),
        // firstDayOfLeave: moment(this.state.firstDayOfLeave).format(),
        // lastDayOfLeave: moment(this.state.lastDayOfLeave).format(),
        // firstDayOfWork: moment(this.state.firstDayOfWork).format(),
        // daysOfLeave: parseInt(this.state.daysOfLeave),
        // publicHolidays: parseInt(this.state.publicHolidays),
        // type: this.state.type,
        // name: this.props.createPatient.name,
        // dob: moment(this.props.createPatient.dob).format(),
        // careLevel: this.props.createPatient.careLevel,
        data: {
          name: this.props.createPatient.name,
          dob: moment(this.props.createPatient.dob).format(),
          careLevel: this.props.createPatient.careLevel,
          organisation: {
            connect: {
              id: this.props.user.currOrgId,
            },
          },
          family: {
            connect: this.props.createPatient.family.map(userId => ({
              id: userId,
            })),
            // connect: [
            //   // {
            //   //   id: "cjqtbjowuao1d0a71pxld5e34",
            //   // },
            //   // {
            //   //   id: "cjqtfjv0t9u780917rrno9p0y",
            //   // },
            // ],
          },
        },
        // {
        //   "data": {
        //     "name": "Patient 1",
        //     "dob": "2018-09-28T14:33:47.264Z",
        //     "careLevel": "REST_HOME",
        //     "organisation": {
        //       "connect": {
        //         "id": "cjqvqkzmkergo0917lfi1jd2z"
        //       }
        //     }
        //   }
        // }
        // family: // ToDo: use connect
      },
      // 25 Mar 2015
    })
    console.log("newPatient => ", newPatient)
  }
}

CreatePatientContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const reduxWrapper = connect(
  state => ({
    user: state.user,
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
  graphql(ALL_USERS, { name: "users" }),
  graphql(CREATE_PATIENT, { name: "createPatientMutation" })
)(CreatePatientContainer)
