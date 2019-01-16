import gql from "graphql-tag"

export const CREATE_PATIENT = gql`
  mutation createPatient($data: PatientCreateInput!) {
    createPatient(data: $data) {
      id
      name
      dob
      careLevel
      family {
        id
        name
      }
      contacts {
        id
        name
        address
      }
    }
  }
`
