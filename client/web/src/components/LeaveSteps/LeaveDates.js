import React, { Component, Fragment } from "react"
// Components
import BasicDatePicker from "../BasicDatePicker"

const LeaveDates = ({
  handleDateChange,
  lastDayOfWork,
  firstDayOfLeave,
  lastDayOfLeave,
  firstDayOfWork,
}) => {
  return (
    <div>
      <BasicDatePicker
        label="Last day of work"
        selectedDate={lastDayOfWork}
        handleDateChange={date => handleDateChange(date, "lastDayOfWork")}
      />
      <BasicDatePicker
        label="First day of leave"
        selectedDate={firstDayOfLeave}
        handleDateChange={date => handleDateChange(date, "firstDayOfLeave")}
      />
      <BasicDatePicker
        label="Last day of leave"
        selectedDate={lastDayOfLeave}
        handleDateChange={date => handleDateChange(date, "lastDayOfLeave")}
      />
      <BasicDatePicker
        label="First day of work"
        selectedDate={firstDayOfWork}
        handleDateChange={date => handleDateChange(date, "firstDayOfWork")}
      />
    </div>
  )
}

export default LeaveDates
