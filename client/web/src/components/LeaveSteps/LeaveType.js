import React from "react"
import { LEAVE_TYPE_OPTIONS } from "../../constants"

// Components
import SelectOption from "../Inputs/SelectOption"

const LeaveType = ({ setLeaveType, type }) => {
  return (
    <SelectOption
      label="Leave Type"
      value={type}
      options={LEAVE_TYPE_OPTIONS}
      handleChange={t => setLeaveType(t)}
    />
  )
}

export default LeaveType
