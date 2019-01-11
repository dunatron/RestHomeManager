export const AUTH_TOKEN = "auth-token"
export const PERSISTENT_STORE_KEYS_ARR = ["user"]
export const ORGANISATION_ID = "organisation-id"
export const QUESTIONS_PER_PAGE = 25

// ROLES
export const ROLE_WIZARD = { name: "Wizard", value: "WIZARD" }
export const ROLE_DEVELOPER = { name: "Developer", value: "DEVELOPER" }
export const ROLE_DESIGNER = { name: "Designer", value: "DESIGNER" }
export const ROLE_PROJECT_MANAGER = {
  name: "Project Manager",
  value: "PROJECT_MANAGER",
}
export const ROLE_TESTER = { name: "Tester", value: "TESTER" }
export const ROLE_ONBOARDER = { name: "On-Boarder", value: "ONBOARDER" }
export const ROLE_ANALYST = { name: "Analyst", value: "ANALYST" }

export const NOMOS_USER_ROLES = [
  ROLE_WIZARD,
  ROLE_DEVELOPER,
  ROLE_DESIGNER,
  ROLE_PROJECT_MANAGER,
  ROLE_TESTER,
  ROLE_ONBOARDER,
  ROLE_ANALYST,
]

export const ROLE_OPTIONS = NOMOS_USER_ROLES.map(r => ({
  name: r.name,
  value: r.value,
}))

// LEAVE
export const ANNUAL_LEAVE = { name: "Annual leave", value: "ANNUAL_LEAVE" }
export const BEREAVEMENT_LEAVE = {
  name: "Bereavement leave",
  value: "BEREAVEMENT_LEAVE",
}
export const PARENTAL_LEAVE = {
  name: "Parental leave",
  value: "PARENTAL_LEAVE",
}
export const PAID_PARENTAL_LEAVE = {
  name: "Paid parental leave",
  value: "PAID_PARENTAL_LEAVE",
}
export const SICK_LEAVE = { name: "Sick leave", value: "SICK_LEAVE" }
export const DOMESTIC_LEAVE = {
  name: "Domestic leave",
  value: "DOMESTIC_LEAVE",
}
export const SPECIAL_LEAVE = { name: "Special leave", value: "SPECIAL_LEAVE" }
export const LONG_SERVICE_LEAVE = {
  name: "Long service leave",
  value: "LONG_SERVICE_LEAVE",
}
export const JURY_SERVICE = { name: "Jury service", value: "JURY_SERVICE" }
export const ACCIDENT_COMPENSATION = {
  name: "Accident compensation",
  value: "ACCIDENT_COMPENSATION",
}
export const EMPLOYMENT_RELATIONS_EDUCATION = {
  name: "Employment relations education",
  value: "EMPLOYMENT_RELATIONS_EDUCATION",
}
export const CIVIL_DEFENCE_EMERGENCY = {
  name: "Civil defence emergency",
  value: "CIVIL_DEFENCE_EMERGENCY",
}
export const MILITARY_SERVICE = {
  name: "Military service",
  value: "MILITARY_SERVICE",
}

export const NOMOS_LEAVE_TYPES = [
  ANNUAL_LEAVE,
  BEREAVEMENT_LEAVE,
  PARENTAL_LEAVE,
  PAID_PARENTAL_LEAVE,
  SICK_LEAVE,
  DOMESTIC_LEAVE,
  SPECIAL_LEAVE,
  LONG_SERVICE_LEAVE,
  JURY_SERVICE,
  ACCIDENT_COMPENSATION,
  EMPLOYMENT_RELATIONS_EDUCATION,
  CIVIL_DEFENCE_EMERGENCY,
  MILITARY_SERVICE,
]

export const LEAVE_TYPE_OPTIONS = NOMOS_LEAVE_TYPES.map(r => ({
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

export const QUESTION_ORDER_BY_INPUT_OPTIONS = NOMOS_LEAVE_TYPES.map(o => ({
  name: o.name,
  value: o.value,
}))
