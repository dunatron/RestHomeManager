import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { QUESTIONS_PER_PAGE } from "../constants"

// Queries
import { PATIENT_FEED } from "../queries/patientFeed"
// containers
import EditablePatientContainer from "./EditablePatientContainer/index"
// Components
import SuperTable from "../components/SuperTable/index"
import Button from "@material-ui/core/Button"
import Modal from "../components/Modal/index"
// import EditableQuestionCard from "./EditableQuestionCard"

class PatientsListContainer extends Component {
  state = {
    modalIsOpen: false,
    modalDetailsObj: {},
  }

  _getQueryVariables = () => {
    const skip = 0
    const first = QUESTIONS_PER_PAGE
    const orderBy = "createdAt_DESC"
    return { first, skip, orderBy }
  }

  _fetchMore = (fetchMore, currCount) => {
    fetchMore({
      variables: {
        skip: currCount + 1,
        first: QUESTIONS_PER_PAGE,
        orderBy: "createdAt_DESC",
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          patientFeed: {
            count: fetchMoreResult.patientFeed.count,
            patients: [
              ...prev.patientFeed.patients,
              ...fetchMoreResult.patientFeed.patients,
            ],
            __typename: "PatientFeed",
            __proto__: Object,
          },
        })
      },
    })
  }

  _updateQuestionInCache = (updatedQuestion, updateQuery) => {
    updateQuery(previousResult => {
      console.group("_updateQuestionInCache")
      console.log("previousResult => ", previousResult)
      console.log("updatedQuestion => ", updatedQuestion)
      const UPDATED_QUESTION = updatedQuestion.data.updateQuestion

      const allQuestions = previousResult.questionFeed.questions
      const idToSearchBy = updatedQuestion.data.updateQuestion.id

      const foundIndex = allQuestions.findIndex(q => q.id === idToSearchBy)
      console.log("foundIndex => ", foundIndex)

      allQuestions.splice(foundIndex, 1, UPDATED_QUESTION)

      // 1. I think we find the indexOf for the previous result based on the id.
      // const indexFound = previousResult.questionFeed.questions.indexOf(
      //   q => q.id === updatedQuestion.data.updateQuestion.id
      // )
      // console.log("indexFound => ", indexFound)
      // 2. then we simply slice out and replace the object at that index
      console.log("Look at all questions now please ", allQuestions)
      console.groupEnd()
      alert("Question has been updated " + JSON.stringify(UPDATED_QUESTION))
      return Object.assign({}, previousResult, {
        questionFeed: {
          count: previousResult.questionFeed.count,
          questions: [...previousResult.questionFeed.questions],
          __typename: "QuestionFeed",
          __proto__: Object,
        },
      })
    })
  }

  showDetails = dataObj => {
    this.setState({
      modalDetailsObj: dataObj,
    })
    this.openModal()
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }

  renderModalDetails = updateQuery => {
    const { modalDetailsObj } = this.state
    const { id, name } = modalDetailsObj
    return (
      <div>
        <EditablePatientContainer patientID={id} />
        {/* <EditableQuestionCard
          question={modalDetailsObj}
          updateQuestion={res => {
            this._updateQuestionInCache(res, updateQuery)
          }}
        /> */}
      </div>
    )
  }

  columnHeaders = () => {
    return [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "name",
        show: true,
        tableRenderKey: "th",
        found: "name",
        searchable: true,
      },
      {
        id: "dob",
        numeric: false,
        disablePadding: true,
        label: "Date of Birth",
        show: true,
        tableRenderKey: "th",
        found: "name",
        searchable: true,
      },
      {
        id: "careLevel",
        numeric: false,
        disablePadding: true,
        label: "Care Level",
        show: true,
        tableRenderKey: "th",
        found: "careLevel",
        searchable: true,
      },
      // {
      //   id: "tags",
      //   label: "More Tags",
      //   show: true,
      //   type: "map",
      //   mapKeys: ['name'],
      //   found: "tags",
      // },
      // {
      //   id: "tags",
      //   label: "More Tags",
      //   show: true,
      //   type: "tag",
      //   tagKey: "name",
      //   found: "tags",
      // },
      {
        id: "showDetails", //votes.id
        numeric: false,
        disablePadding: true,
        label: "Show Details",
        show: true,
        type: "btnFunc",
        icon: (
          <Button color="primary" aria-label="Add to shopping cart">
            Show Details
          </Button>
        ),
        funcName: "showDetails",
        found: "votes",
        tableRenderKey: "th",
      },
    ]
  }

  render() {
    const { modalIsOpen, modalDetailsObj } = this.state
    return (
      <Query query={PATIENT_FEED} variables={this._getQueryVariables()}>
        {({
          loading,
          error,
          data,
          subscribeToMore,
          fetchMore,
          updateQuery,
        }) => {
          if (loading && !data.patientFeed) return <div>Fetching</div>
          if (error) return <div>Error</div>
          // this._subscribeToNewSamples(subscribeToMore)
          // this._subscribeToNewVotes(subscribeToMore)

          // console.log("Here is data ", data)

          // const samplesToRender = this._getSamplesToRender(data)
          // const isNewPage = this.props.location.pathname.includes("new")
          // const pageIndex = this.props.match.params.page
          //   ? (this.props.match.params.page - 1) * SAMPLES_PER_PAGE
          //   : 0
          const { patientFeed } = data
          if (!patientFeed) {
            return "No Question Feed"
          }
          const { patients, count } = patientFeed

          if (patients.length < count) {
            // we need to keep fetching
            this._fetchMore(fetchMore, patients.length)
          }

          console.group("Patient Feed Debug")
          console.log("patients.length => ", patients.length)
          console.log("count => ", count)
          console.groupEnd()

          return (
            <Fragment>
              {modalIsOpen ? (
                <Modal
                  title={modalDetailsObj.name}
                  width={800}
                  height={500}
                  close={() => this.closeModal()}>
                  {/* <div onClick={() => this.closeModal()}>Close</div> */}
                  {this.renderModalDetails(updateQuery)}
                </Modal>
              ) : null}
              <div>
                <SuperTable
                  columnHeaders={this.columnHeaders()}
                  // tags={{
                  //   found: "tags",
                  //   key: "id",
                  //   options: allTags
                  //     ? allTags.map(t => ({ name: t.name, value: t.id }))
                  //     : [],
                  // }}
                  title="Patients List"
                  data={patients}
                  executeFunc={(funcName, obj) => {
                    this.executeFunctionByName(funcName, obj)
                  }}
                />
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case "showDetails":
        this.showDetails(dataObj)
        break
      default:
        alert("No function specified")
    }
  }
}

export default compose(withApollo)(PatientsListContainer)
