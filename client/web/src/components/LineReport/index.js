import React, { Component } from "react"
import Button from "@material-ui/core/Button"

class LineReport extends Component {
  // IMPORTANT NOTE> THE JITTERING IS HAPPENING WHEN YOU SCROLL ON THE WHITE KEY PANEL SECTION ONLY
  // IMPORTAN NOTE> COPY WHAT YOU HAVE DONE SO FAR ON THe v4. It does not jitter
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.state = {
      affix: false,
      topDist: 0,
      scrollLeftVal: 0,
      collapsed: true,
    }
  }
  // state = {
  //   affix: false,
  //   topDist: 0,
  // }

  componentDidMount = () => {
    // affix column title to top ToDo: rename these scroll listers to appropriate names
    window.addEventListener("scroll", this.handleScroll)
    // Horizontal Column scroll bindings for the top
    var el = document.querySelector(`#top-scroll-bar-${this.props.id}`)
    el.addEventListener("scroll", this.handleTopScroll)
    this.wrapperRef.addEventListener("scroll", this.handleBottomScroll)
  }

  componentWillUnmount = () => {
    // affix column title to top ToDo: rename these scroll listers to appropriate names
    window.removeEventListener("scroll", this.handleScroll)
    // Horizontal Column scroll bindings for the top
    var el = document.querySelector(`#top-scroll-bar-${this.props.id}`)
    el.removeEventListener("scroll", this.handleTopScroll)
    this.wrapperRef.removeEventListener("scroll", this.handleBottomScroll)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleTopScroll = () => {
    var el = document.querySelector(`#top-scroll-bar-${this.props.id}`)
    const leftVal = el.scrollLeft
    this.wrapperRef.scrollLeft = leftVal
  }

  handleBottomScroll = () => {
    const leftVal = this.wrapperRef.scrollLeft
    var el = document.querySelector(`#top-scroll-bar-${this.props.id}`)
    el.scrollLeft = leftVal
  }

  handleScroll = event => {
    // var el = document.querySelector("#affix-target")
    var el = document.querySelector(`#affix-target-${this.props.id}`)
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
    const {
      id,
      data,
      rowProps,
      columnProps,
      reportWidth,
      keyPanelWidth,
      colWidth,
      name,
      maxHeight,
    } = this.props
    const colPanelWidth = reportWidth - keyPanelWidth
    const { affix, collapsed } = this.state
    let affixTopScrollBar = {
      top: affix ? `${this.state.topDist + 30}px` : "30px",
    }
    let accordionStyle = {
      maxHeight: collapsed ? 0 : `${maxHeight}px`,
    }
    return (
      <div style={{ marginBottom: "30px" }}>
        <div>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
            Toggle {name}
          </Button>
        </div>
        <div
          // id="affix-target"
          id={`affix-target-${this.props.id}`}
          className={`lineReport ${collapsed ? "hidden" : ""}`}
          style={{ ...accordionStyle }}>
          <div className="rowKeyPanel">
            <div className="columnTitle" />
            {rowProps.map((rowProp, rIdx) => this.renderRowKey(rowProp, rIdx))}
          </div>

          <div
            // id="top-scroll-bar"
            className="top-scroll-bar"
            id={`top-scroll-bar-${this.props.id}`}
            style={{
              ...affixTopScrollBar,
              width: `${colPanelWidth}px`,
              marginLeft: `${keyPanelWidth}px`,
            }}>
            <div style={{ width: `${colWidth * data.length}px` }}>
              <div style={{ visibility: "hidden" }}>
                You can't see me. But I see you. Lord{" "}
              </div>
            </div>
          </div>
          <div className="columnPanels" ref={this.setWrapperRef}>
            {/* {affix && <div id="top-scroll-bar">I should be a scrollbar</div>} */}
            {/* <div id="top-scroll-bar" style={{ width: `${colPanelWidth}px` }}>
            <div style={{ width: `${colWidth * data.length}px` }}>
              I should be a scrollbar hmmm
            </div>
          </div> */}
            {data.map((dataColumn, cIdx) =>
              this.renderColumn(dataColumn, cIdx)
            )}
          </div>
        </div>
      </div>
    )
  }

  renderRowKey = ({ name, key, type, keyClasses }) => {
    switch (type) {
      case "header":
        return <div className={`typeHeader ${keyClasses}`}>{name}</div>
      case "p":
        return <div className={`typeP ${keyClasses}`}>{name}</div>
      case "h1":
        return <div className={`typeH1 ${keyClasses}`}>{name}</div>
      case "hr":
        return <hr className={`typeHr ${keyClasses}`} />
      default:
        return
    }
  }

  zebraStyleOnAffix = (affix, cIdx) => {
    if (!affix) {
      return "transparent"
    }
    // return Math.abs(cIdx % 2) === 1 ? "rgb(242, 242, 242)" : "#FCFCFC" // same
    return Math.abs(cIdx % 2) === 1 ? "rgb(242, 242, 242)" : "#FCFCFC" // same
  }

  renderColumn = ({ columnTitle, values }, cIdx) => {
    // const columnColor = cIdx % 2 === 0 ? "#ffffff" : "#f2f2f2"
    const columnColor =
      cIdx % 2 === 0 ? "rgba(187, 184, 184, 0.043)" : "#f2f2f2"

    const { rowProps } = this.props
    const { affix } = this.state
    let affixStyle = {
      position: "relative",
      color: "#444545",
      fontWeight: "bold",
      top: `${this.state.topDist}px`,
      zIndex: 1,
      textAlign: "center",
      background: this.zebraStyleOnAffix(affix, cIdx),
    }
    return (
      <div
        className="columnPanel"
        style={{
          backgroundColor: columnColor,
          minWidth: `${this.props.colWidth}px`,
        }}>
        <p className="columnTitle" style={affixStyle}>
          {columnTitle}
        </p>
        {rowProps.map((rowProp, rIdx) => {
          const { name, key, type, cellClasses } = rowProp
          const cellValue = values[key]
          return this.renderCellType(rowProp, cellValue)
        })}
      </div>
    )
  }

  renderCellType = ({ name, key, type, cellClasses }, val) => {
    switch (type) {
      case "p": {
        return (
          <div className={`typeP flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      }
      case "h1": {
        return (
          <div className={`typeH1 flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      }
      case "header":
        return (
          <div className={`typeHeader flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      case "hr":
        return <hr className={`typeHr ${cellClasses}`} />
      default:
        return
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

export default LineReport
