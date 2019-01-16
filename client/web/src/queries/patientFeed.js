import gql from "graphql-tag"

export const PATIENT_FEED = gql`
  query patientFeed(
    $where: PatientWhereInput
    $orderBy: PatientOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    patientFeed(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      count
      patients {
        id
        name
        dob
        careLevel
        allocatedRoom {
          id
          name
        }
        tasks {
          id
          name
          note
          priorityLevel
        }
      }
    }
  }
`
