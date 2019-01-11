import React, { Component, Fragment } from "react"
import moment from "moment"
// components
import Navigation from "./Navigation"
import Header from "./Header"
import Week from "./Week"

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: props.initDate ? moment(props.initDate) : moment(),
    }
  }

  changeMonth = val => {
    const newDate = this.state.date.add(val, "months")
    this.setState({
      date: newDate,
    })
    this.props.fetchMoreData({ date: newDate })
  }

  renderWeeks(currentDate) {
    let weeks = [],
      done = false,
      date = moment(currentDate)
        .startOf("month")
        .day("Sunday"),
      monthIndex = date.month(),
      count = 0

    while (!done) {
      const weeksEvents = []

      let startWeek = moment(date)
        .startOf("week")
        .format()
      let endOfWeek = moment(date)
        .endOf("week")
        .format()

      // weeks.push(
      //   <div>I am a week</div>
      // )
      weeks.push(
        <Week
          WeekNumber={count + 1}
          data={
            this.props.data
              ? this.props.data.filter(d => d.date.isSame(date, "month"))
              : []
          }
          startWeek={startWeek}
          endWeek={endOfWeek}
          key={date.toString()}
          date={date.clone()}
          month={this.state.date}
          select={this.select}
          selected={this.props.selected}
          eventClick={this.props.eventClick}
        />
      )

      //date.add(1, "w");
      Object.assign({}, date, date.add(1, "w"))
      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }

  render() {
    const { date } = this.state
    const nextMonth = moment(date)
      .add(1, "months")
      .format("MMMM")
    const prevMonth = moment(date)
      .add(-1, "months")
      .format("MMMM")
    return (
      <Fragment>
        {this.props.loading ? (
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.5)",
              zIndex: 9999,
            }}>
            Loading overlay
          </div>
        ) : null}
        <Navigation
          date={date.format("MMMM YYYY")}
          prev={prevMonth}
          next={nextMonth}
          changeMonth={val => this.changeMonth(val)}
        />
        <Header />
        <div style={{ height: "550px" }}>
          {this.renderWeeks(this.state.date)}
        </div>
      </Fragment>
    )
  }
}

export default Calendar
