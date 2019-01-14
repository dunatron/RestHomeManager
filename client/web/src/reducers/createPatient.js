import { AUTH_TOKEN } from "../constants"
import moment from "moment"
const defaultState = {
  name: "",
  dob: null,
  careLevel: 5,
  family: [],
  contacts: [],
  organisation: "",
  tasks: "",
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      const name = action.payload.name
      const value = action.payload.value
      // localStorage.setItem(AUTH_TOKEN, action.payload.token)
      return {
        ...state,
        [name]: value,
      }
    default:
      return state
  }
}
