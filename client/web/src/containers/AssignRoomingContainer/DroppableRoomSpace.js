import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
const grid = 8
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
})
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

const DroppableRoomSpace = ({ id, items, type, removeRoom }) => {
  return (
    <Droppable droppableId={id} type={type}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}>
          {items.length < 1 && <div>[DROP ROOM TO ALLOCATE]</div>}
          {/* {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}>
                  {item.id}
                  {item.name}
                  {item.content}
                </div>
              )}
            </Draggable>
          ))} */}
          {items &&
            items.map((item, orgIdx) => {
              return (
                <Chip
                  key={orgIdx}
                  icon={<FaceIcon />}
                  label={item.name}
                  onDelete={() => removeRoom(item.id)}
                  // className={classes.chip}
                  color="secondary"
                  variant="outlined"
                />
              )
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    // <Droppable droppableId={id} type="ROOM">
    //   {(provided, snapshot) => (
    //     <div
    //       ref={provided.innerRef}
    //       style={{
    //         backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
    //       }}
    //       {...provided.droppableProps}>
    //       <p>Drop Organisation here to add</p>
    //       {provided.placeholder}
    //       {items &&
    //         items.map((item, orgIdx) => {
    //           return (
    //             <Chip
    //               key={orgIdx}
    //               icon={<FaceIcon />}
    //               label={item.name}
    //               // onDelete={() => removeOrg(org.id)}
    //               // className={classes.chip}
    //               color="secondary"
    //               variant="outlined"
    //             />
    //           )
    //         })}
    //     </div>
    //   )}
    // </Droppable>
  )
}

export default DroppableRoomSpace
