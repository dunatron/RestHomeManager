import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  card: {
    minWidth: 275,
    borderRadius: 0,
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,

    // flexGrow: 1,
  },
  doneStrip: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.unit * 2,
  },
  doneText: {
    padding: theme.spacing.unit,
  },
})

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  updateTimerState() {
    const timeTaken = Date.now() - this.state.start
    this.setState({
      time: timeTaken,
    })
    this.props.timeTaken(timeTaken)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true,
    })
    this.timer = setInterval(() => this.updateTimerState(), 1)
  }
  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({ time: 0 })
  }
  render() {
    let start =
      this.state.time == 0 ? (
        <Button onClick={this.startTimer} variant="outlined">
          start
        </Button>
      ) : null
    let stop = this.state.isOn ? (
      <Button onClick={this.stopTimer} variant="outlined">
        stop
      </Button>
    ) : null
    let reset =
      this.state.time != 0 && !this.state.isOn ? (
        <Button onClick={this.resetTimer} variant="outlined">
          reset
        </Button>
      ) : null
    let resume =
      this.state.time != 0 && !this.state.isOn ? (
        <Button onClick={this.startTimer} variant="outlined">
          resume
        </Button>
      ) : null
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h2" color="secondary">
          {this.state.time}
        </Typography>
        {start}
        {resume}
        {stop}
        {reset}
      </div>
    )
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Timer)
