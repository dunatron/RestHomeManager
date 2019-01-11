import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"
import Button from "@material-ui/core/Button"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos"

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing.unit * 8,
    background: fade(theme.palette.primary.main, 0.5),
  },
  date: {
    fontSize: "22px",
  },
})
const Navigation = ({ classes, date, prev, next, changeMonth }) => (
  <div className={classes.root}>
    <Button
      onClick={() => changeMonth(-1)}
      // variant="outlined"
      color="secondary"
      className={classes.button}>
      <ArrowBackIcon className={classes.rightIcon} />
      {prev}
    </Button>
    <div className={classes.date}>{date}</div>
    <Button
      onClick={() => changeMonth(1)}
      // variant="outlined"
      color="secondary"
      className={classes.button}>
      {next}
      <ArrowForwardIcon className={classes.rightIcon} />
    </Button>
  </div>
)

export default withStyles(styles)(Navigation)
