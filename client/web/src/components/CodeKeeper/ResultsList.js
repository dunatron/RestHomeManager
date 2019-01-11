import React, { Component } from "react"
import "react-virtualized/styles.css"
// You can import any component you want as a named export from 'react-virtualized', eg
import { Column, Table, AutoSizer, List } from "react-virtualized"
import CodeSnippetPanel from "./CodeSnippetPanel"
import { withStyles } from "@material-ui/core/styles"
//https://github.com/bvaughn/react-virtualized/blob/master/source/List/List.example.js
const styles = theme => ({
  root: {
    display: "block",
    padding: 0,
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      padding: theme.spacing.unit * 2,
      justifyContent: "space-around",
    },
  },
})
class ResultsList extends Component {
  render() {
    const { classes, results } = this.props
    return (
      <div className={classes.root}>
        {results.map((result, resultIdx) => (
          <CodeSnippetPanel key={resultIdx} code={result} />
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(ResultsList)
