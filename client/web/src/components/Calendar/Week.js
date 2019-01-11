import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import DaySquare from "./Day"
// import { fade } from "@material-ui/styles/colorManipulator"
import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = theme => ({
  week: {
    height: "auto",
    width: "100%",
    border: "none",
    "min-height": "50px",
  },
  weekDays: {
    height: "100%",
    display: "flex",
  },
  [theme.breakpoints.up("md")]: {
    week: {
      border: "none",
      // "box-shadow": `inset 0 -1px 0 ${fade(theme.palette.primary.main, 0.8)}`,
      "&:last-child": {
        "box-shadow": "none",
      },
    },
  },
})

class Week extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.date !== this.props.date
  }

  render() {

    const { classes, WeekNumber, date, month } = this.props

    let daysInMonth = month.daysInMonth()
    let weeksInMonth = Math.ceil(daysInMonth / 7)

    let days = []

    for (let i = 0; i < 7; i++) {
      let day = {
        prettyDate: date.format("dddd Do MMMM"),
        number: date.format("D"),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        dateCompare: date.format("YYYY-MM-DD"),
        year: date.format("YYYY"),
        month: date.format("MM"),
        day: date.format("DD"),
      }

      days.push(
        <DaySquare
          key={i}
          data={this.props.data}
          dayNumber={day.number}
          prettyDate={day.prettyDate}
          isToday={day.isToday}
          eventClick={this.props.eventClick}
          date={day.date}
          year={day.year}
          month={day.month}
          day={day.day}
        />
      )
      Object.assign({}, date, date.add(1, "d"))
    }

    return (
      <div
        className={classes.week}
        style={{ height: `calc(100% / ${weeksInMonth})` }}
        key={days[0].toString()}>
        <div
          className={classes.weekDays}
          ref={`WeeksDays-${WeekNumber}`}
          id={`WeeksDays-${WeekNumber}`}>
          {days}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Week)
