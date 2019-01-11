import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: theme.spacing.unit * 8,
    background: fade(theme.palette.primary.main, 0.5),
  },
  item: {
    flex: "1 1 0",
    textAlign: "center",
  },
})
const Header = ({ classes }) => (
  <div className={classes.root}>
    <span className={classes.item}>Sunday</span>
    <span className={classes.item}>Monday</span>
    <span className={classes.item}>Tuesday</span>
    <span className={classes.item}>Wednesday</span>
    <span className={classes.item}>Thursday</span>
    <span className={classes.item}>Friday</span>
    <span className={classes.item}>Saturday</span>
  </div>
)

export default withStyles(styles)(Header)
