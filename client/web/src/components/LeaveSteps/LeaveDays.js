import React, { Component, Fragment } from "react"
// Components
import NumberInput from "../Inputs/NumberInput"

const LeaveDays = ({ daysOfLeave, publicHolidays, handleChange }) => {
  return (
    <div>
      <NumberInput
        label="Public Holidays"
        value={daysOfLeave}
        handleChange={v => handleChange("daysOfLeave", v)}
      />
      <NumberInput
        label="Days of actual leave"
        value={publicHolidays}
        handleChange={v => handleChange("publicHolidays", v)}
      />
    </div>
  )
}

export default LeaveDays
