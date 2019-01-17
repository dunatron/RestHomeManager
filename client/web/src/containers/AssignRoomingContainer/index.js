import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import ReactDOM from "react-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { graphql, compose, withApollo, Query } from "react-apollo"

// components
import PatientList from "./PatientList"
import RoomsList from "./RoomsList"
// Queries
import { ROOM_FEED } from "../../queries/roomFeed"
// Mutations
import { UPDATE_PATIENT } from "../../mutations/updatePatient"
//constants
import { ROOMS_PER_FETCH, ROOMS_FETCH_ORDER_BY } from "../../constants"

const styles = theme => ({
  root: {
    display: "flex",
    flex: "1 1 0",
  },
  patientWrapper: {
    // width: "50%",
    height: `calc(100vh - 68px)`,
    overflow: "auto",
    padding: theme.spacing.unit * 3,
    boxSizing: "border-box",
  },
})

class AssignRoomingContainer extends Component {
  _assignRoomToPatient = async (roomId, patientId) => {
    await this.props.updatePatient({
      variables: {
        where: {
          id: patientId,
        },
        data: {
          allocatedRoom: {
            connect: {
              id: roomId,
            },
          },
        },
      },
      update: (cache, { data: { updatePatient } }) => {
        this._updateCacheAfterRoomAssign(cache, updatePatient, roomId)
      },
    })
  }

  _removeRoomFromPatient = async (patientId, roomId) => {
    await this.props.updatePatient({
      variables: {
        where: {
          id: patientId,
        },
        data: {
          allocatedRoom: {
            disconnect: true,
          },
        },
      },
      update: (cache, { data: { updatePatient } }) => {
        this._updateCacheAfterRoomDisconnect(
          cache,
          updatePatient,
          roomId,
          patientId
        )
      },
    })
  }

  _updateCacheAfterRoomDisconnect = (
    cache,
    updatePatient,
    roomId,
    patientId
  ) => {
    const cachedRooms = cache.readQuery({
      query: ROOM_FEED,
      variables: {
        first: ROOMS_PER_FETCH,
        skip: 0,
        orderBy: ROOMS_FETCH_ORDER_BY,
      },
    })
    const updateRoom = cachedRooms.roomFeed.rooms.find(
      room => room.id === roomId
    )
    const indexToSplice = updateRoom.patients.findIndex(
      patient => patient.id === patientId
    )
    console.log("constIndexToSplice => ", indexToSplice)

    // This is mutating cache directly so we don't need t write to it with the function
    updateRoom.patients.splice(indexToSplice, 1)
  }

  _updateCacheAfterRoomAssign = (cache, updatePatient, roomId) => {
    const cachedRooms = cache.readQuery({
      query: ROOM_FEED,
      variables: {
        first: ROOMS_PER_FETCH,
        skip: 0,
        orderBy: ROOMS_FETCH_ORDER_BY,
      },
    })
    const updateRoom = cachedRooms.roomFeed.rooms.find(
      room => room.id === roomId
    )
    // This is mutating cache directly so we don't need t write to it with the function
    updateRoom.patients.push({
      id: updatePatient.id,
      name: updatePatient.name,
      __typename: "Patient",
    })

    // cache.writeQuery({
    //   query: ROOM_FEED,
    //   roomFeed,
    //   variables: {
    //     first: ROOMS_PER_FETCH,
    //     skip: 0,
    //     orderBy: ROOMS_FETCH_ORDER_BY,
    //   },
    // })

    console.groupEnd()
  }

  onDragEnd = result => {
    try {
      if (
        result.source.droppableId === "DroppableRooms" &&
        result.reason === "DROP"
      ) {
        const roomId = result.draggableId
        const patientId = result.destination.droppableId
        this._assignRoomToPatient(roomId, patientId)
      }
    } catch (e) {
      console.log("onDragEnd => ", e)
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { classes } = this.props
    console.log("This.props => ", this.props)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.root}>
          <div className={classes.patientWrapper}>
            <PatientList
              unAssignRoom={(patientId, roomId) =>
                this._removeRoomFromPatient(patientId, roomId)
              }
            />
          </div>
          <div className={classes.patientWrapper}>
            <RoomsList />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

// export default AssignRoomingContainer

export default compose(
  withStyles(styles, { withTheme: true }),
  // graphql(UPDATE_QUESTION, { name: "updateStockQuestion" }),
  graphql(UPDATE_PATIENT, { name: "updatePatient" }),
  withApollo
)(AssignRoomingContainer)
