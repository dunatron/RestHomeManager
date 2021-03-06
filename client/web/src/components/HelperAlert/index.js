import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import HelpIcon from "@material-ui/icons/Help"

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  messageHeader: {
    display: "block",
    fontSize: "18px",
    color: theme.palette.primary.main,
  },
  messageBody: {},
})

class HelperAlert extends React.Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { classes, header, message } = this.props
    return (
      <div style={{ display: "inline" }}>
        <IconButton
          color="secondary"
          size="small"
          aria-label="helper text"
          onClick={this.handleClick}>
          <HelpIcon size="small" />
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={10000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            "aria-describedby": `${header}message-id`,
          }}
          message={
            <div id={`${header}message-id`}>
              <span className={classes.messageHeader}>{header}</span>
              <span className={classes.messageBody}>{message}</span>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="primary"
              className={classes.close}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

HelperAlert.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HelperAlert)
