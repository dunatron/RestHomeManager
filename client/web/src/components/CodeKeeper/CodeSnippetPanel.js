import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 0,
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  [theme.breakpoints.up("sm")]: {
    card: {
      margin: theme.spacing.unit,
    },
  },
})

class CodeSnippetPanel extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const {
      classes,
      code: { id, name, content, tags, links },
    } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          action={[
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>,
            <IconButton>
              <MoreVertIcon />
            </IconButton>,
          ]}
          // title={name}
          // subheader="September 14, 2016"
          subheader={name}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <div>
            <h4>Tags: {tags.map((t, tIdx) => t.name)}</h4>
          </div>
          <CardContent>{content}</CardContent>
        </Collapse>
      </Card>
    )
  }
}

CodeSnippetPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CodeSnippetPanel)
