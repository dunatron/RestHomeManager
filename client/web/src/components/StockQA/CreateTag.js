import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose, Query } from "react-apollo"
// Queries
import { ALL_TAGS } from "../../queries/AllTags.graphql"
// Mutations
import { CREATE_TAG } from "../../mutations/CreateTag.graphql"
// Subscriptions
import { NEW_TAG_SUBSCRIPTION } from "../../subscriptions/NewTagSubscription.graphql"
// components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import SuperTable from "../SuperTable/index"
// icons
import AddIcon from "@material-ui/icons/Add"
const styles = theme => ({
  root: {
    maxWidth: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
  heading: { fontSize: 18, color: theme.palette.primary.main },
  questionInput: {
    width: "100%",
  },
})

const COLUMN_HEADERS = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "name",
    show: true,
    tableRenderKey: "th",
    found: "name",
    searchable: true,
  },
]

class CreateTag extends Component {
  defaultState = () => {
    const defaultState = {
      name: "",
    }
    return defaultState
  }
  state = this.defaultState()

  _subscribeToNewTags = async subscribeToMore => {
    subscribeToMore({
      document: NEW_TAG_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const { node } = subscriptionData.data.newTag
        return Object.assign({}, prev, {
          allTags: [node, ...prev.allTags],
        })
      },
    })
  }

  render() {
    const { creating, name } = this.state
    const {
      classes,
    } = this.props

    return (
      <div className={classes.root}>
        <TextField
          id="create-tag"
          label="New Tag"
          className={classes.questionInput}
          value={name}
          multiline
          onChange={e =>
            this.setState({
              name: e.target.value,
            })
          }
          margin="normal"
        />
        <Button onClick={() => this._createTag()} variant="outlined">
          Create Tag
        </Button>
        <Query query={ALL_TAGS}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>
            const more = async () =>
              subscribeToMore({
                document: NEW_TAG_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev
                  const { node } = subscriptionData.data.newTag
                  return Object.assign({}, prev, {
                    allTags: [node, ...prev.allTags],
                  })
                },
              })
            return (
              <SuperTable
                columnHeaders={COLUMN_HEADERS}
                subscribeToMore={more}
                title="Table of Tags"
                data={data.allTags}
                executeFunc={(funcName, obj) => {
                  this.executeFunctionByName(funcName, obj)
                }}
              />
            )
          }}
        </Query>
      </div>
    )
  }

  _createTag = async () => {
    this.props
      .createTag({
        variables: {
          name: this.state.name,
        },
      })
      .catch(e => {
        alert(e)
      })
  }

  clearComponent() {
    this.setState(this.defaultState())
  }
}

CreateTag.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  graphql(CREATE_TAG, { name: "createTag" }),
  withApollo
)(CreateTag)

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore()
  }
  render() {
    const { data } = this.props
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.allTags.map((tag, idx) => {
          return <li>{tag.name}</li>
        })}
      </ul>
    )
  }
}
