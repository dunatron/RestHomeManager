import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
// material components
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
// custom components
import SearchFilter from "../Inputs/SearchFilter"
import MultiSelectChip from "../Inputs/MultiSelectChip"
const styles = theme => ({
  expansionPanel: {
    display: "block",
  },
})

const ResultsFilter = ({
  classes,
  search,
  selectedTags,
  tagOptions,
  updateTags,
  updateSearch,
}) => (
  <div>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Results Filter</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanel}>
        <SearchFilter
          value={search}
          fullWidth={true}
          handleChange={v => updateSearch(v)}
        />
        <MultiSelectChip
          values={selectedTags}
          options={tagOptions}
          handleChange={values => updateTags(values)}
          removeItem={v => alert(v)}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default withStyles(styles)(ResultsFilter)
