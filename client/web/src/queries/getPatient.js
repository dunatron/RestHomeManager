import gql from "graphql-tag"

export const PATIENT_QUERY = gql`
  query patient($where: PatientWhereUniqueInput!) {
    patient(where: $where) {
      id
      name
      dob
      careLevel
      family {
        id
        name
        email
      }
      contacts {
        id
        name
        homePhone
        mobilePhone
        address
      }
      tasks(where: { complete: false }) {
        name
        complete
        completedAt
        priorityLevel
        note
        alertBefore
        checkAt
        taskDays
        repeat
        saveAsTemplate
      }
    }
  }
`
