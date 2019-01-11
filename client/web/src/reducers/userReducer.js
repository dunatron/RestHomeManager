import { AUTH_TOKEN } from "../constants"

const defaultState = {
  token: localStorage.getItem("jwt"),
  validToken: false,
  name: "",
  email: "",
  role: "",
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      localStorage.setItem(AUTH_TOKEN, action.payload.token)
      return {
        ...state,
        ...action.payload,
      }
    case "LOGOUT_USER":
      localStorage.removeItem(AUTH_TOKEN)
      return {
        ...state,
        name: "",
        email: "",
        role: "",
        token: null,
        validToken: false,
      }
    default:
      return state
  }
}
