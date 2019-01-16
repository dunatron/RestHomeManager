import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"

const styles = {
  root: {
    flexGrow: 1,
  },
}

const LinearProgressBar = props => {
  const { classes, name, size, currentSize, color } = props
  const progress = (currentSize / size) * 100
  return (
    <div>
      {size && (
        <Typography variant="h5" component="h2">
          {name} {currentSize} / {size}
        </Typography>
      )}
      <p />
      <LinearProgress variant="determinate" color={color} value={progress} />
    </div>
  )
}

LinearProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LinearProgressBar)
