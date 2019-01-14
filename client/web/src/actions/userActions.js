export function setUserDetails(user) {
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  }
}

export function setUserOrg(orgId) {
  return {
    type: "SET_USER_ORG",
    payload: orgId,
  }
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
  }
}
