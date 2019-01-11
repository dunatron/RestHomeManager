import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
  },
})

const ActionBar = ({ classes, config }) => (
  <div>
    {config.map((conf, confIdx) => (
      <Button
        className={classes.button}
        onClick={conf.action}
        color={conf.color ? conf.color : "default"}>
        {conf.name}
      </Button>
    ))}
  </div>
)

export default withStyles(styles)(ActionBar)
