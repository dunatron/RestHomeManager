import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"
import LabelIcon from "@material-ui/icons/Label"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { difference } from "ramda"
// Mutations
import { UPDATE_QUESTION } from "../../mutations/UpdateQuestion.graphql"
//components
import TagsSelector from "./TagsSelector"

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  questionInput: {
    // maxWidth: "100%",
    width: "100%",
  },
  answerInput: {
    // maxWidth: "100%",
    width: "100%",
  },
  createAnswerInput: {
    // maxWidth: "100%",
    width: "100%",
  },
})
class EditableQuestionCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      canUpdate: false,
      id: props.question.id,
      name: props.question.name,
      answers: {
        update: props.question.answers.map(answer => {
          return {
            where: {
              id: answer.id,
            },
            data: {
              response: answer.response,
            },
          }
        }),
        create: [],
      },
      links: {
        update: props.question.links.map(link => {
          return {
            where: {
              id: link.id,
            },
            data: {
              name: link.name,
              url: link.url,
            },
          }
        }),
      },
      notes: {
        update: props.question.notes.map(note => {
          return {
            where: {
              id: note.id,
            },
            data: {
              content: note.content,
            },
          }
        }),
      },
      tags: {
        connect: props.question.tags.map(t => {
          return { id: t.id, name: t.name }
        }),
        disconnect: [],
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state && this.state.canUpdate === false) {
      this.setState({
        canUpdate: true,
      })
    }
  }

  _update = async () => {
    try {
      const res = await this.props.updateStockQuestion({
        variables: {
          id: this.state.id,
          data: {
            name: this.state.name,
            answers: { ...this.state.answers },
            // notes: this.state.notes,
            // links: this.state.links,
            tags: { ...this.state.tags },
          },
        },
      })
      this.props.updateQuestion(res)
    } catch (e) {
      alert(e)
    } finally {
      // this.clearComponent()
      this.setState({
        canUpdate: false,
      })
    }
  }

  toggleEditing = bool => {
    this.setState({
      editing: bool,
    })
  }
  updateName = v => {
    this.setState({
      name: v,
    })
  }
  updateAnswer = (val, answerIdx) => {
    const answers = this.state.answers
    answers[answerIdx].response = val
    this.setState({
      answers: answers,
    })
  }
  render() {
    const { classes } = this.props
    const {
      editing,
      canUpdate,
      id,
      name,
      answers,
      links,
      notes,
      tags,
    } = this.state
    return (
      <Card className={classes.card}>
        <Switch
          onChange={() => this.toggleEditing(!this.state.editing)}
          checked={this.state.editing}
        />

        <CardContent>
          {this.renderName(name, editing)}
          {/* {this.renderTags()} */}
          <div>{this.renderTags(tags.connect, editing)}</div>

          <div>{this.renderKnownAnswers(answers.update, editing)}</div>
          <div>{this.renderCreateAnswers(answers.create, editing)}</div>

          {editing && (
            <Button onClick={() => this.addAnswer()}>Add answer</Button>
          )}
        </CardContent>
        <CardActions>
          {canUpdate && (
            <Button size="small" onClick={() => this._update()}>
              Update
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }

  renderName = (name, editing) => {
    const { classes } = this.props
    if (editing) {
      return (
        <TextField
          className={classes.questionInput}
          label="Question"
          multiline
          value={name}
          onChange={e => this.updateName(e.target.value)}
        />
      )
    }
    return (
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {name}
      </Typography>
    )
  }

  addAnswer = () => {
    const answers = this.state.answers
    answers.create.push({ response: "" })
    this.setState({
      answers: answers,
    })
  }

  updateKnownAnswer = (val, idx) => {
    const answers = this.state.answers
    answers.update[idx].data.response = val
    this.setState({
      answers: answers,
    })
  }

  updateCreateAnswer = (val, idx) => {
    const answers = this.state.answers
    answers.create[idx].response = val
    this.setState({
      answers: answers,
    })
  }

  // connectTags = values => {
  //   const tags = this.state.tags
  //   tags.connect = values.map(v => ({ id: v }))
  //   this.setState({
  //     tags: tags,
  //   })
  // }

  setTags = values => {
    const connectArr = values.map(v => ({ id: v }))
    const currTags = this.state.tags.connect.map(cT => ({ id: cT.id }))
    const disconnectArr = difference(currTags, connectArr)
    this.setState({
      tags: {
        // ...this.state.tags,
        connect: connectArr,
        // disconnect: [...this.state.tags.disconnect, ...disconnectArr],
        disconnect: this.state.tags.disconnect.concat(disconnectArr),
      },
    })
  }

  removeTagByValue = v => {
    alert("To DO removeTagByValue on EditableQuestionCard")
    // const tags = this.state.tags
    // const itemIdx = tags.connect.findIndex(t => t.id === v)
    // tags.connect.splice(itemIdx, 1)
    // this.setState({
    //   tags: tags,
    // })
  }

  renderKnownAnswers = (answers, editing) => {
    const { classes } = this.props
    return answers.map((answer, idx) => {
      if (editing) {
        return (
          <Fragment>
            <TextField
              className={classes.answerInput}
              label={`Update Answer ${idx + 1}`}
              multiline
              value={answer.data.response}
              onChange={e => this.updateKnownAnswer(e.target.value, idx)}
            />
          </Fragment>
        )
      }
      return (
        <ul>
          <li>response{answer.data.response}</li>
        </ul>
      )
    })
  }

  renderCreateAnswers = (answers, editing) => {
    const { classes } = this.props
    return answers.map((answer, idx) => {
      if (editing) {
        return (
          <Fragment>
            <TextField
              className={classes.createAnswerInput}
              label={`Create New Answer ${idx + 1}`}
              multiline
              value={answer.response}
              onChange={e => this.updateCreateAnswer(e.target.value, idx)}
            />
          </Fragment>
        )
      }
      return (
        <ul>
          <li>response{answer.response}</li>
        </ul>
      )
    })
  }

  renderTags = (tags, editing) => {
    const { classes } = this.props
    if (editing) {
      return (
        <TagsSelector
          values={tags.map(t => t.id)}
          handleChange={values => this.setTags(values)}
          removeItem={v => this.removeTagByValue(v)}
        />
      )
    }
    return (
      <div className={classes.chips}>
        {tags.map((t, tIdx) => (
          <Chip
            // onDelete={() => removeItem(value)}
            icon={<LabelIcon mini />}
            variant="outlined"
            color="secondary"
            label={t.name}
            className={classes.chip}
            key={t.id}
          />
        ))}
      </div>
    )
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  graphql(UPDATE_QUESTION, { name: "updateStockQuestion" }),
  withApollo
)(EditableQuestionCard)
