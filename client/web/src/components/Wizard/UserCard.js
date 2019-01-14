import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Droppable } from "react-beautiful-dnd"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
import { ROLE_OPTIONS } from "../../constants"

// Components
import SelectOption from "../Inputs/SelectOption"

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const UserCard = ({
  user,
  classes,
  handleRoleChange,
  removeOrg,
  setUserRole,
}) => {
  console.log("User card user => ", user)
  const { id, name, email, role, organisations } = user

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {id}
        </Typography>
        <Typography variant="headline" component="h2">
          {name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Role:
          {role}
        </Typography>
        {role === "WIZARD" && (
          <Typography className={classes.pos} color="textSecondary">
            {`This man is a ${role} you cannot alter him`}
          </Typography>
        )}
        {/* {Organisations here is going to be a drag and rop context =)} */}
        <Typography variant="headline" component="h2">
          Organisations
        </Typography>
        <Droppable droppableId={id} type="ORG">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
              }}
              {...provided.droppableProps}>
              <p>Drop Organisation here to add</p>
              {provided.placeholder}
              {organisations &&
                organisations.map((org, orgIdx) => {
                  return (
                    <Chip
                      key={orgIdx}
                      icon={<FaceIcon />}
                      label={org.name}
                      onDelete={() => removeOrg(org.id)}
                      className={classes.chip}
                      color="secondary"
                      variant="outlined"
                    />
                  )
                })}
            </div>
          )}
        </Droppable>
      </CardContent>
      <CardActions>
        <FormGroup>
          {role !== "WIZARD" ? (
            <div>
              <SelectOption
                value={role}
                options={ROLE_OPTIONS}
                handleChange={r => setUserRole(r)}
              />
            </div>
          ) : (
            "This man is a wizard and cannot be altered by the likes of you"
          )}
        </FormGroup>
      </CardActions>
    </Card>
  )
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserCard)
