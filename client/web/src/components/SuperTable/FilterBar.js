import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import CheckBoxSelection from "../Inputs/CheckBoxSelection"
import MultiSelect from "../Inputs/MultiSelect"

const styles = theme => ({
  root: {},
  content: {
    overflow: "hidden",
    flexBasis: "100%",
    transition: "all 0.5s ease",
  },
  closed: {
    height: 0,
    minHeight: 0,
    opacity: 0,
  },
  open: {
    overflow: "auto",
    opacity: 1,
    height: theme.spacing.unit * 8,
    minHeight: theme.spacing.unit * 8,
  },
})

const FilterBar = props => {
  const contentClasses = [props.classes.content]
  props.open
    ? contentClasses.push(props.classes.open)
    : contentClasses.push(props.classes.closed)
  return (
    <div className={contentClasses.join(" ")}>
      <CheckBoxSelection
        options={props.columnHeaders}
        handleOptionChange={optionObj => {
          props.updateShowProp(optionObj)
        }}
      />
      {/* <MultiSelect
        values={props.columnHeaders
          .filter(header => header.show === true)
          .map(h => {
            return h.id
          })}
        selectID="ooo"
        label={"Always apply the stuff"}
        options={props.columnHeaders.map(header => {
          return {
            name: header.label,
            value: header.id,
          }
        })}
        handleChange={values => props.updateShowValues(values)}
      /> */}
    </div>
  )
}

export default withStyles(styles)(FilterBar)
