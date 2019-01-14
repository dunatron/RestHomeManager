import { ORGANISATION_ID, AUTH_TOKEN } from "../constants"

const defaultState = {
  currOrgId: null,
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
    case "SET_USER_ORG":
      localStorage.setItem(ORGANISATION_ID, action.payload)
      return {
        ...state,
        currOrgId: action.payload,
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
