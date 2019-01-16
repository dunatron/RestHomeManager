// import React, { Component, Fragment } from "react"
// import { withStyles } from "@material-ui/core/styles"
// import { graphql, compose, withApollo, Query } from "react-apollo"
// import { DragDropContext } from "react-beautiful-dnd"

// // components
// import PatientList from "./PatientList"
// import RoomsList from "./RoomsList"

// const styles = theme => ({
//   root: {
//     display: "flex",
//     flex: "1 1 0",
//   },
//   patientWrapper: {
//     width: "50%",
//     height: `calc(100vh - 68px)`,
//     overflow: "auto",
//     padding: theme.spacing.unit * 3,
//     boxSizing: "border-box",
//   },
// })
// class AssignRoomingContainer extends Component {
//   constructor(props) {
//     super(props)
//   }

//   onBeforeDragStart = () => {
//     /*...*/
//   }

//   onDragStart = () => {
//     /*...*/
//   }
//   onDragUpdate = () => {
//     /*...*/
//   }
//   onDragEnd = () => {
//     // the only one that is required
//   }

//   render() {
//     const { classes } = this.props
//     // ToDo create rich getPatient query component card {id}
//     // Will get everything dor the patient and will subscribe to tasks
//     return (
//       <DragDropContext
//         onBeforeDragStart={this.onBeforeDragStart}
//         onDragStart={this.onDragStart}
//         onDragUpdate={this.onDragUpdate}
//         onDragEnd={this.onDragEnd}>
//         <div className={classes.root}>
//           <div className={classes.patientWrapper}>
//             <PatientList />
//           </div>
//           <div className={classes.patientWrapper}>
//             <RoomsList />
//           </div>
//         </div>
//       </DragDropContext>
//     )
//   }
// }

// export default compose(
//   withStyles(styles, { withTheme: true }),
//   // graphql(UPDATE_QUESTION, { name: "updateStockQuestion" }),
//   withApollo
// )(AssignRoomingContainer)

import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import ReactDOM from "react-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { graphql, compose, withApollo, Query } from "react-apollo"

// components
import PatientList from "./PatientList"
import RoomsList from "./RoomsList"
import DroppableRoomSpace from "./DroppableRoomSpace"

const styles = theme => ({
  root: {
    display: "flex",
    flex: "1 1 0",
  },
  patientWrapper: {
    width: "50%",
    height: `calc(100vh - 68px)`,
    overflow: "auto",
    padding: theme.spacing.unit * 3,
    boxSizing: "border-box",
  },
})

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  try {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  } catch (e) {
    console.log("Move error => ", e)
  }
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
})

class AssignRoomingContainer extends Component {
  state = {
    items: getItems(10),
    selected: getItems(5, 10),
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected",
  }

  getList = id => this.state[this.id2List[id]]

  onDragEnd = result => {
    try {
      // const orgID = result.draggableId
      // const userId = result.destination.droppableId
      // this._addOrgToUser(orgID, userId)
    } catch (e) {
      console.log("onDragEnd => ", e)
    }
    // if (result.type === "ROOM") {
    //   const { source, destination } = result
    //   console.group("Debug Drag End")
    //   console.log("result => ", result)
    //   console.log("source => ", source)
    //   console.log("destination=> ", destination)
    //   console.groupEnd()
    // try {
    //   const orgID = result.draggableId
    //   const userId = result.destination.droppableId
    //   this._addOrgToUser(orgID, userId)
    // } catch (e) {
    //   // alert(`an error ${e}`)
    // }
    // }
    // try {
    //   const { source, destination } = result
    //   console.group("Debug Drag End")
    //   console.log("source => ", source)
    //   console.log("destination=> ", destination)
    //   console.groupEnd()
    //   // dropped outside the list
    //   if (!destination) {
    //     return
    //   }
    //   if (source.droppableId === destination.droppableId) {
    //     const items = reorder(
    //       this.getList(source.droppableId),
    //       source.index,
    //       destination.index
    //     )
    //     let state = { items }
    //     if (source.droppableId === "droppable2") {
    //       state = { selected: items }
    //     }
    //     this.setState(state)
    //   } else {
    //     const result = move(
    //       this.getList(source.droppableId),
    //       this.getList(destination.droppableId),
    //       source,
    //       destination
    //     )
    //     this.setState({
    //       items: result.droppable,
    //       selected: result.droppable2,
    //     })
    //   }
    // } catch (e) {
    //   console.log("Drag error => ", e)
    // }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { classes } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.root}>
          <div className={classes.patientWrapper}>
            <PatientList />
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
  withApollo
)(AssignRoomingContainer)
