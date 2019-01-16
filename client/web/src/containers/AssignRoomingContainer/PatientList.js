import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { PATIENTS_PER_FETCH } from "../../constants"

// Queries
import { PATIENT_FEED } from "../../queries/patientFeed"
// containers
//components
import SearchFilter from "../../components/Inputs/SearchFilter"
import DroppableRoomSpace from "./DroppableRoomSpace"
import Spinner from "../../components/Loaders/Spinner"
import LinerProgressBar from "../../components/Loaders/LinerProgressBar"

class PatientList extends Component {
  state = {
    searchText: "",
  }

  _getQueryVariables = () => {
    const skip = 0
    const first = PATIENTS_PER_FETCH
    const orderBy = "createdAt_DESC"
    return { first, skip, orderBy }
  }

  _fetchMore = (fetchMore, currCount) => {
    fetchMore({
      variables: {
        skip: currCount + 1,
        first: PATIENTS_PER_FETCH,
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

  render() {
    const { searchText } = this.state
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
          if (loading && !data.patientFeed) return <Spinner />
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

          console.group("Patient Feed Debug")
          console.log("patients.length => ", patients.length)
          console.log("count => ", count)
          console.groupEnd()

          if (patients.length + 1 < count) {
            // we need to keep fetching
            this._fetchMore(fetchMore, patients.length)
            // note below return is because the list changes when we fetch more meaning if we drag over druring an update it crashes
            return (
              <LinerProgressBar
                name="Loading Patients..."
                size={count}
                currentSize={patients.length}
              />
            )
          }

          let patientsList = patients
          if (searchText.length > 1) {
            const searchString = searchText.toLowerCase()
            // func to filter our list by full text search on the name field
            function find(items, text) {
              text = text.split(" ")
              return items.filter(function(item) {
                return text.every(function(el) {
                  return item.name.toLowerCase().indexOf(el) > -1
                })
              })
            }
            // filter by our search function
            patientsList = find(patients, searchString)
            // send filtered list to the client
            // return searchedItems
          }

          return (
            <Fragment>
              <div>PAtient List</div>
              <SearchFilter
                label="Search Patient List"
                fullWidth={true}
                value={searchText}
                handleChange={v => this.setState({ searchText: v })}
              />

              {patientsList.map((patient, patientId) => {
                const { id, name, dob, careLevel, allocatedRoom } = patient
                return (
                  <div>
                    <p>{id}</p>
                    <p>{name}</p>
                    <p>{dob}</p>
                    <p>{careLevel}</p>
                    {/* <p>
                      {allocatedRoom ? (
                        allocatedRoom.name
                      ) : (
                        <DroppableRoomSpace id={id} items={[]} type="ROOM" />
                      )}
                    </p> */}
                    <DroppableRoomSpace
                      id={id}
                      type="ROOM"
                      removeRoom={id => alert("Remove room " + id)}
                      items={allocatedRoom ? [{ ...allocatedRoom }] : []}
                    />
                    <hr />
                  </div>
                )
              })}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default compose(withApollo)(PatientList)
