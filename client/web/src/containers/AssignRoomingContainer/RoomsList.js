import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { ROOMS_PER_FETCH } from "../../constants"
// import Draggable from "react-draggable" // Both at the same time
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "@material-ui/core/styles"

// Queries
import { ROOM_FEED } from "../../queries/roomFeed"
// containers
//components
import SearchFilter from "../../components/Inputs/SearchFilter"
import DraggableRoomCard from "./DraggableRoomCard"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
const grid = 8
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 300,
})
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
})
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
class RoomsList extends Component {
  state = {
    searchText: "",
  }

  _getQueryVariables = () => {
    const skip = 0
    const first = ROOMS_PER_FETCH
    const orderBy = "createdAt_DESC"
    return { first, skip, orderBy }
  }

  _fetchMore = (fetchMore, currCount) => {
    fetchMore({
      variables: {
        skip: currCount + 1,
        first: ROOMS_PER_FETCH,
        orderBy: "createdAt_DESC",
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          roomFeed: {
            count: fetchMoreResult.roomFeed.count,
            rooms: [...prev.roomFeed.rooms, ...fetchMoreResult.roomFeed.rooms],
            __typename: "RoomFeed",
            __proto__: Object,
          },
        })
      },
    })
  }

  render() {
    const { classes } = this.props
    const { searchText } = this.state

    return (
      <Query query={ROOM_FEED} variables={this._getQueryVariables()}>
        {({
          loading,
          error,
          data,
          subscribeToMore,
          fetchMore,
          updateQuery,
        }) => {
          if (loading && !data.roomFeed) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const { roomFeed } = data
          if (!roomFeed) {
            return "No Question Feed"
          }
          const { rooms, count } = roomFeed

          if (rooms.length + 1 < count) {
            // we need to keep fetching
            this._fetchMore(fetchMore, rooms.length)
            // note below return is because the list changes when we fetch more meaning if we drag over druring an update it crashes
            return (
              <div>
                <h1>Loading Patients</h1>
              </div>
            )
          }
          let filteredRoomsList = rooms
          if (searchText.length > 1) {
            const searchString = searchText.toLowerCase()
            // func to filter our list by full text search on the name field
            function find(items, text) {
              text = text.split(" ")
              return items.filter(function(item) {
                return text.every(function(el) {
                  return item.name.toLowerCase().indexOf(el) > -1
                })
              })
            }
            // filter by our search function
            filteredRoomsList = find(rooms, searchString)
            // send filtered list to the client
            // return searchedItems
          }

          return (
            <Fragment>
              <div>Rooms List</div>
              <SearchFilter
                label="Search Room List"
                fullWidth={true}
                value={searchText}
                handleChange={v => this.setState({ searchText: v })}
              />
              <Droppable droppableId={"DropppableRooms"} type="ROOM">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {rooms.map((room, idx) => {
                      const { id, name, size, patients } = room
                      return (
                        <div key={idx}>
                          {/* <p>{id}</p>
                          <p>{name}</p>
                          <p>{size}</p> */}
                          {/* <DraggableRoomCard id={id} index={idx} room={room} /> */}
                          <Draggable key={id} draggableId={id} index={idx}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}>
                                <p>{name}</p>
                                <p>size: {size}</p>
                                <p>
                                  {patients.length}/{size}
                                </p>
                                {patients &&
                                  patients.map((patient, idx) => {
                                    return (
                                      <div>
                                        <p>{patient.name}</p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )}
                          </Draggable>
                          <hr />
                        </div>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

// export default compose(withApollo)(RoomsList)

export default compose(
  withApollo,
  withStyles(styles)
)(RoomsList)
