import React, { Component, Fragment, PureComponent } from "react"
import { withStyles } from "@material-ui/core/styles"
import { compose, withApollo } from "react-apollo/index"
import { fade } from "@material-ui/core/styles/colorManipulator"
import Modal from "../Modal/index"

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: "0 0 4px 0",
    borderBottom: `1px dashed ${fade(theme.palette.secondary.main, 0.5)}`,
  },
})
class Item extends Component {
  state = {
    modalIsOpen: false,
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }
  render() {
    const { modalIsOpen } = this.state
    const { classes, data } = this.props
    return (
      <div className={classes.root}>
        <span onClick={() => this.openModal()}>{data.name}</span>
        {modalIsOpen ? (
          <Modal width={800} height={500} close={() => this.closeModal()}>
            <div onClick={() => this.closeModal()}>Close</div>
            <div>date: {data.prettyDate}</div>
            <div>Applied for on:{data.created}</div>
            <div>Details: {data.details}</div>
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default withStyles(styles)(Item)
