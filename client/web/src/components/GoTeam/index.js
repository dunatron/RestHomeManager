import React, { Component } from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  phraseItem: {
    ...theme.typography.display4,
    // fontSize: "2em",
    color: theme.palette.primary.main,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

const goRhymes = [
  "Bio",
  "Blow",
  "Bo",
  "Bow",
  "Bro",
  "Bros",
  "Crow",
  "Crowe",
  "Doh",
  "Dough",
  "Faux",
  "Flow",
  "Foe",
  "Glow",
  "Grow",
  "Hoe",
  "Jo",
  "Joe",
  "Know",
  "Low",
  "Moe",
  "Mow",
  "No",
  "Oh",
  "Pro",
  "Row",
  "Schmoe",
  "Sew",
  "Show",
  "Slow",
  "Snow",
  "So",
  "Sow",
  "Stow",
  "Though",
  "Throw",
  "Toe",
  "Tow",
  "Whoa",
  "Woe",
  "Yo",
]

const teamRhymes = [
  "Beam",
  "Bream",
  "Cream",
  "Creme",
  "Dream",
  "Gleam",
  "Ream",
  "Scheme",
  "Scream",
  "Seam",
  "Seem",
  "Steam",
  "Stream",
  "Theme",
]

class GoTeam extends Component {
  constructor(props) {
    super(props)
    this.state = { phrases: [] }
    this.handleAdd = this.handleAdd.bind(this)
  }

  generatePhrase = () => {
    const goRnd = Math.floor(Math.random() * (goRhymes.length - 1))
    const teamRnd = Math.floor(Math.random() * (teamRhymes.length - 1))
    const phrase =
      (goRnd === -1 && "") || `${goRhymes[goRnd]} ${teamRhymes[teamRnd]}`
    return phrase
  }

  handleAdd = async () => {
    // remove all current phrases first
    await this.setState({ phrases: [] })
    const newPhrases = this.state.phrases.concat(this.generatePhrase())
    this.setState({ phrases: newPhrases })
  }

  handleRemove(i) {
    let newPhrases = this.state.phrases.slice()
    newPhrases.splice(i, 1)
    this.setState({ phrases: newPhrases })
  }

  renderPhrases = () => {
    const { classes } = this.props
    const phrases = this.state.phrases.map((item, i) => (
      <div
        className={classes.phraseItem}
        key={item}
        onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ))
    return phrases
  }

  render() {
    const { classes } = this.props
    const phrases = this.renderPhrases()
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleAdd()}
          className={classes.button}>
          GO TEAM
        </Button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={200}>
          {/* <div className={classes.phraseItem}>{phrases}</div> */}
          {phrases}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default withStyles(styles)(GoTeam)
