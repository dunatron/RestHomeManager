import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { Draggable } from "react-beautiful-dnd"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
import DroppableRoomSpace from "./DroppableRoomSpace"
const grid = 8
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",
  background: "#FFF",
  // border: isDragging ? "2px dashed #d81b60" : "2px solid #FFF",
  boxSizing: "border-box",
  // overflow: "hidden",
  // styles we need to apply on draggables
  ...draggableStyle,
})

const styles = theme => ({
  card: {
    maxWidth: 400,
    borderRadius: 0,
    border: "2px solid transparent",
    // background: theme.palette.primary.light,
  },
  cardIsDragging: {
    boxShadow: "none",
    border: `2px dashed ${theme.palette.primary.main}`,
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
  avatar: {
    backgroundColor: red[500],
  },
})

class DraggablePatientCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes, index, patient, removeRoom } = this.props
    const { id, name, dob, careLevel, allocatedRoom } = patient

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
              }`}>
              <CardContent>
                <Typography
                  component="h2"
                  gutterBottom
                  color="primary"
                  variant="title">
                  {name}
                </Typography>
                {/* <Typography component="p">{dob}</Typography> */}
                {/* <Typography component="p" gutterBottom={true}>
                  {careLevel}
                </Typography> */}
                <Typography component="p" gutterBottom>
                  Allocated Room:{" "}
                </Typography>
                <DroppableRoomSpace
                  id={id}
                  type="ROOM"
                  removeRoom={roomId => removeRoom(roomId)}
                  items={allocatedRoom ? [{ ...allocatedRoom }] : []}
                />
              </CardContent>

              {/* <CardActions className={classes.actions} disableActionSpacing>
                <Typography component="p">
                  {allocatedRoom ? "Allocated Room" : "Click to allocate Room"}
                </Typography>
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
                  <DroppableRoomSpace
                    id={id}
                    type="ROOM"
                    removeRoom={roomId => removeRoom(roomId)}
                    items={allocatedRoom ? [{ ...allocatedRoom }] : []}
                  />
                </CardContent>
              </Collapse> */}
            </Card>
          </div>
        )}
      </Draggable>
    )
  }
}

DraggablePatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DraggablePatientCard)
