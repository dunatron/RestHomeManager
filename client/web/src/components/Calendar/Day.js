import React, { Component, Fragment, PureComponent } from "react"
import { withStyles } from "@material-ui/core/styles"
import { compose, withApollo } from "react-apollo/index"
import { fade } from "@material-ui/core/styles/colorManipulator"
import Item from "./Item"

const styles = theme => ({
  root: {
    // border: `1px solid ${fade(theme.palette.primary.main, 1)}`,
    border: `1px solid lightgrey`,
    flex: "1 1 0",
    // overflow: "auto",
    overflow: "hidden",
    height: "100%",
  },
  rootInner: {
    height: "100%",
    left: "30px",
    paddingRight: "30px",
    position: "relative",
    overflow: "auto",
  },
  dateLabel: {
    // left: "-30px",
    position: "absolute",
    // background: fade(theme.palette.secondary.main, 0.5),
    background: fade(theme.palette.primary.main, 0.5),
    borderRadius: 25,
    height: 25,
    width: 25,
    margin: 2,
    display: "flex",
    alignItems: "center",
  },
  labelInner: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemsWrapper: {
    marginTop: 25,
  },
})

class DaySquare extends PureComponent {
  render() {
    const { classes, prettyDate, date, data } = this.props

    return (
      <div className={classes.root}>
        <p className={classes.dateLabel}>
          <span className={classes.labelInner}>{this.props.dayNumber}</span>
        </p>
        <div className={classes.rootInner}>
          <div className={classes.itemsWrapper}>
            {data
              .filter(d => d.prettyDate === prettyDate)
              .map((d, dIdx) => (
                <Item key={dIdx} data={d} />
              ))}
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withApollo
)(DaySquare)
