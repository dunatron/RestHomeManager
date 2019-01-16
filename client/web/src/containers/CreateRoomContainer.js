import React, { Component } from "react"
import gql from "graphql-tag"
import { withRouter } from "react-router"
import { Mutation, withApollo, compose } from "react-apollo/index"
import { CREATE_ROOM } from "../mutations/createRoom"

// Components
import TextInput from "../components/Inputs/TextInput"
import NumberInput from "../components/Inputs/NumberInput"

class CreateRoomContainer extends Component {
  state = {
    name: "",
    size: 0,
  }

  render() {
    const { name, size } = this.state
    const { orgId } = this.props
    return (
      <div>
        <div className="flex flex-column mt3">
          <TextInput
            id="roomName"
            label="Room Name"
            value={name}
            handleChange={value => this.setState({ name: value })}
          />
          <NumberInput
            id="roomSize"
            label="Room Size"
            value={size}
            handleChange={value => this.setState({ size: value })}
          />
        </div>

        <Mutation
          mutation={CREATE_ROOM}
          variables={{ data: { name, size: parseInt(size) } }}
          update={(store, { data: { createRoom } }) => {
            const { id, name, size } = createRoom
            alert("CREATED: " + name)
            // const data = store.readQuery({
            //   query: SINGLE_DOCUMENT_QUERY,
            //   variables: { id: documentId },
            // })
            // data.singleDocument.sections.unshift(postSection)
            // store.writeQuery({
            //   query: SINGLE_DOCUMENT_QUERY,
            //   data,
            //   variables: { id: documentId },
            // })
          }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(CreateRoomContainer)
