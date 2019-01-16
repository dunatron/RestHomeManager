import gql from "graphql-tag"

export const ALL_PATIENTS = gql`
  query allPatients($where: PatientWhereInput) {
    allPatients(where: $where) {
      id
      name
    }
  }
`
