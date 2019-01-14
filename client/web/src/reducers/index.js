import { combineReducers } from "redux"

import user from "./userReducer"
import createPatient from "./createPatient"

export default combineReducers({
  user,
  createPatient,
})
