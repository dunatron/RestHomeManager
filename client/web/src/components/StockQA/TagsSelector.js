import React, { Component } from "react"
import { graphql, compose, withApollo, Query } from "react-apollo"
import MultiSelectChip from "../Inputs/MultiSelectChip"
import { withStyles } from "@material-ui/core"

// Queries
import { ALL_TAGS } from "../../queries/AllTags.graphql"

const styles = theme => ({
  root: {},
})
const TagsSelector = ({
  values,
  handleChange,
  removeItem,
  data: { allTags, loading, error },
}) => {
  // if (loading) {
  //   return "loading tags"
  // }
  // const options = allTags.map(t => ({ name: t.name, value: t.id }))
  return (
    <MultiSelectChip
      label="Tags"
      // options={options}
      options={loading ? [] : allTags.map(t => ({ name: t.name, value: t.id }))}
      values={values}
      removeItem={v => removeItem(v)}
      handleChange={values => handleChange(values)}
    />
  )
}

export default compose(
  withStyles(styles),
  graphql(ALL_TAGS),
  withApollo
)(TagsSelector)
