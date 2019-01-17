import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Droppable } from "react-beautiful-dnd"
import Chip from "@material-ui/core/Chip"
//icons
import FaceIcon from "@material-ui/icons/Face"
import DragAndDropIcon from "@material-ui/icons/FilterNone"
const grid = 8
const getListStyle = (isDraggingOver, theme) => ({
  // border: isDraggingOver
  //   ? `2px dashed ${theme.palette.primary.main}`
  //   : `2px dashed ${theme.palette.secondary.main}`,
  background: isDraggingOver ? `${theme.palette.secondary.light}` : "none",
  padding: grid,
  // width: 250,
})

const styles = theme => ({
  root: {},
  dropSpace: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: theme.palette.secondary.light,
  },
  iconWrapper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px 0`,
  },
})

const DroppableRoomSpace = ({
  classes,
  theme,
  id,
  items,
  type,
  removeRoom,
}) => {
  if (items.length > 0) {
    return (
      <div>
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
      </div>
    )
  }

  return (
    <Droppable droppableId={id} type={type}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, theme)}>
          {items.length < 1 && (
            <div className={classes.dropSpace}>
              <div className={classes.iconWrapper}>
                <DragAndDropIcon />
              </div>
              Drop room to allocate
            </div>
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

DroppableRoomSpace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DroppableRoomSpace)
