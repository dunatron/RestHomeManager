export const AUTH_TOKEN = "auth-token"
export const ORGANISATION_ID = "organisation-id"
export const PERSISTENT_STORE_KEYS_ARR = ["user"]
export const QUESTIONS_PER_PAGE = 25
export const ROOMS_PER_FETCH = 3
export const ROOMS_FETCH_ORDER_BY = "createdAt_DESC"
export const PATIENTS_PER_FETCH = 100

// ROLES
export const ROLE_WIZARD = { name: "Wizard", value: "WIZARD" }
export const ROLE_MANAGER = { name: "Manager", value: "MANAGER" }

export const ROLE_NURSE = {
  name: "Nurse",
  value: "NURSE",
}
export const ROLE_CAREGIVER = { name: "Caregiver", value: "CAREGIVER" }
export const ROLE_FAMILY = { name: "Family", value: "FAMILY" }

export const USER_ROLES = [
  // ROLE_WIZARD, This can never be set any
  ROLE_MANAGER,
  ROLE_NURSE,
  ROLE_CAREGIVER,
  ROLE_FAMILY,
]

export const ROLE_OPTIONS = USER_ROLES.map(r => ({
  name: r.name,
  value: r.value,
}))

// enum CARE_LEVEL {
//   REST_HOME
//   DEMENTIA
//   HOSPITAL_CARE
// }

export const REST_HOME = {
  name: "Rest Home",
  value: "REST_HOME",
}
export const DEMENTIA = {
  name: "Dementia",
  value: "DEMENTIA",
}
export const HOSPITAL_CARE = {
  name: "Hospital Care",
  value: "HOSPITAL_CARE",
}

export const CARE_LEVEL = [REST_HOME, DEMENTIA, HOSPITAL_CARE]

export const CARE_LEVEL_OPTIONS = CARE_LEVEL.map(r => ({
  name: r.name,
  value: r.value,
}))

// Question Order By Input
// const QuestionOrderByInput = [
//   name:
// ]

const ID_ASC = {
  name: "id_ASC",
  value: "id_ASC",
}
const ID_DESC = {
  name: "id_DESC",
  value: "id_DESC",
}
const NAME_ASC = {
  name: "name_ASC",
  value: "name_ASC",
}
const NAME_DESC = {
  name: "name_DESC",
  value: "name_DESC",
}
const UPDATED_AT_ASC = {
  name: "updatedAt_ASC",
  value: "updatedAt_ASC",
}
const UPDATED_AT_DESC = {
  name: "updatedAt_DESC",
  value: "updatedAt_DESC",
}
const CREATED_AT_ASC = {
  name: "createdAt_ASC",
  value: "createdAt_ASC",
}
const CREATED_AT_DESC = {
  name: "createdAt_DESC",
  value: "createdAt_DESC",
}

export const QUESTION_ORDER_BY_INPUT = [
  ID_ASC,
  ID_DESC,
  NAME_ASC,
  NAME_DESC,
  UPDATED_AT_ASC,
  UPDATED_AT_DESC,
  CREATED_AT_ASC,
  CREATED_AT_DESC,
]
