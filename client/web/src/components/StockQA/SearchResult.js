import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const styles = theme => ({
  root: {},
  question: {
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  answersList: {
    padding: 20,
  },
  amount: {
    color: theme.palette.secondary.main,
  },
})

class SearchResult extends Component {
  render() {
    const {
      classes,
      question: { name, answers, links, notes },
    } = this.props

    return (
      <div>
        <h2 className={classes.question}>{name}</h2>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Answers{" "}
                <span className={classes.amount}>({answers.length})</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {answers && (
                <ul>
                  {answers.map((answer, answerIdx) => {
                    return (
                      <li>
                        <Typography key={answerIdx}>
                          {answer.response}
                        </Typography>
                      </li>
                    )
                  })}
                </ul>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Notes <span className={classes.amount}>({notes.length})</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {notes.length >= 1 ? (
                <ul>
                  {notes.map((note, noteIdx) => {
                    return <li key={noteIdx}>{note.content}</li>
                  })}
                </ul>
              ) : (
                "No Notes"
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Links <span className={classes.amount}>({links.length})</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {links.length >= 1 ? (
                <div>
                  {links.map((link, linkIdx) => {
                    return (
                      <li key={linkIdx}>
                        <a target="__blank" href={link.url}>
                          {link.name}
                        </a>
                      </li>
                    )
                  })}
                </div>
              ) : (
                "No Links"
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchResult)
