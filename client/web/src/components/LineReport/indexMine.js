import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  lineReport: {
    width: 1200,
    display: "flex",
  },
  rowKeyPanel: {
    minWidth: 400,
    backgroundColor: "lightgrey",
  },
  columnPanels: {
    display: "flex",
    maxWidth: 800,
    overflow: "auto",
  },
  columnPanel: {},
  columnTitle: {
    margin: 0,
    height: 40,
    padding: 15,
  },
  columnCell: {
    display: "block",
    margin: 0,
  },
  typeHeader: {
    height: 80,
    padding: 5,
    fontSize: "18px",
  },
  typeH1: {
    height: 60,
    fontSize: "16px",
    padding: 5,
    fontWeight: 900,
  },
  typeP: {
    padding: 5,
    height: 30,
  },
})

class LineReport extends Component {
  state = {
    affix: false,
    topDist: 0,
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = event => {
    var el = document.querySelector("#affix-target")
    const { affix } = this.state
    if (el.getBoundingClientRect().y < 0) {
      this.setState({
        affix: true,
        topDist: Math.abs(el.getBoundingClientRect().y),
      })
    } else if (el.getBoundingClientRect().y > 0) {
      this.setState({
        affix: false,
        topDist: 0,
      })
    }
  }

  render() {
    const { classes, data, rowProps, columnProps } = this.props
    return (
      <div id="affix-target" className={classes.lineReport}>
        <div className={classes.rowKeyPanel}>
          <div className={classes.columnTitle} />
          {rowProps.map((rowProp, rIdx) => this.renderRowKey(rowProp, rIdx))}
        </div>

        <div className={classes.columnPanels}>
          {data.map((dataColumn, cIdx) => this.renderColumn(dataColumn, cIdx))}
        </div>
      </div>
    )
  }

  renderRowKey = ({ name, key, type }) => {
    const { classes } = this.props
    switch (type) {
      case "header":
        return <div className={classes.typeHeader}>{name}</div>
      case "p":
        return <div className={classes.typeP}>{name}</div>
      case "h1":
        return <div className={classes.typeH1}>{name}</div>
    }
  }

  renderColumn = ({ columnTitle, values }, cIdx) => {
    const columnColor = cIdx % 2 === 0 ? "#ffffff" : "#f2f2f2"
    const { classes, rowProps } = this.props
    let affixStyle = {
      position: "relative",
      // width: `${panelWidth}px`,
      color: "#444545",
      fontWeight: "bold",
      top: `${this.state.topDist}px`,
      zIndex: 1,
      textAlign: "center",
      // background: this.zebraStyleOnAffix(affix, colIndex),
    }
    return (
      <div
        className={classes.columnPanel}
        style={{
          backgroundColor: columnColor,
          width: `${this.props.colWidth}px`,
        }}>
        <p className={classes.columnTitle} style={affixStyle}>
          {columnTitle}
        </p>
        {rowProps.map((rowProp, rIdx) => {
          const { name, key, type } = rowProp
          // return <span className={classes.columnCell}>{values[key]}</span>
          // this.renderCellType(rowProp, values[key])
          const cellValue = values[key]
          return this.renderCellType(rowProp, cellValue)
        })}
      </div>
    )
  }

  renderCellType = ({ name, key, type }, val) => {
    const { classes } = this.props
    switch (type) {
      case "p": {
        return <div className={classes.typeP}>{this.getCellValue(val)}</div>
      }
      case "h1": {
        return <div className={classes.typeH1}>{this.getCellValue(val)}</div>
      }
      case "header":
        return (
          <div className={classes.typeHeader}>{this.getCellValue(val)}</div>
        )
    }
  }

  getCellValue = val => {
    switch (val) {
      case undefined:
        return ""
      default:
        return val
    }
  }
}

export default withStyles(styles)(LineReport)
