// import React, { Component, Fragment } from "react"
// import { Draggable } from "react-beautiful-dnd"
// import RoomCard from "../../components/RoomCard/index"
// const grid = 8
// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",
//   height: isDragging ? "40px" : "200px",
//   overflow: "hidden",

//   // styles we need to apply on draggables
//   ...draggableStyle,
//   height: isDragging ? "40px" : "200px",
// })

// const getItemStyle = (isDragging, draggableStyle) => {
//   console.log("draggableStyle => ", draggableStyle)
//   return {
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     // padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,

//     // change background colour if dragging
//     // background: isDragging ? "lightgreen" : "grey",
//     boxSizing: "border-box",
//     // styles we need to apply on draggables
//     ...draggableStyle,
//   }
// }
import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { Droppable, Draggable } from "react-beautiful-dnd"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
import DragAndDropIcon from "@material-ui/icons/FilterNone"

const grid = 8
const getListStyle = isDraggingOver => ({
  border: isDraggingOver ? "2px dashed lightgreen" : "2px dashed lightblue",
  background: isDraggingOver ? "lightblue" : "none",
  padding: grid,
  // width: 250,
})

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // styles we need to apply on draggables
  ...draggableStyle,
})

const styles = theme => ({
  card: {
    maxWidth: 400,
    // background: theme.palette.secondary.light,
    borderRadius: 0,
    border: "2px dashed transparent",
  },
  cardIsDragging: {
    boxShadow: "none",
    border: `2px dashed ${theme.palette.secondary.main}`,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  dropSpace: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px 0`,
  },
})

// const DraggableRoomCard = ({ classes, index, room }) => {

//   return (

//   )
// }

class DraggableRoomCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes, index, room } = this.props
    const { id, name, size, patients } = room

    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}>
            <Card
              className={`${classes.card} ${
                snapshot.isDragging ? classes.cardIsDragging : ""
              }`}
              color="secondary">
              <CardContent>
                <Typography component="h2" color="secondary" variant="title">
                  {name}
                </Typography>
                <Typography component="p">{size}</Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Typography component="p">Allocated Patients</Typography>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more">
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Droppable droppableId={id} type={"PATIENT"}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {/* {items.length < 1 && <div>[DROP ROOM TO ALLOCATE]</div>} */}
                        <div className={classes.dropSpace}>
                          <div className={classes.iconWrapper}>
                            <DragAndDropIcon />
                          </div>
                          Drop patient to assign
                        </div>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  {patients &&
                    patients.map((patient, idx) => {
                      return (
                        <div>
                          <Typography paragraph>{patient.name}</Typography>
                        </div>
                      )
                    })}
                  {/* <Typography paragraph>Method:</Typography> */}
                </CardContent>
              </Collapse>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }
}

DraggableRoomCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DraggableRoomCard)
