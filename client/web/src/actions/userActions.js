export function setUserDetails(user) {
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  }
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
  }
}
