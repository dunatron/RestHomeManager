import gql from "graphql-tag"

export const UPDATE_PATIENT = gql`
  mutation updatePatient(
    $data: PatientUpdateInput!
    $where: PatientWhereUniqueInput!
  ) {
    updatePatient(data: $data, where: $where) {
      id
      name
    }
  }
`

// {
//   "where": {
//     "id": "cjqxmjus4q95l0a71piiz7m1s"
//   },
//   "data": {
//     "name": "New Patient Name",
//     "dob": "2018-09-28T14:33:47.264Z",
//     "careLevel": "DEMENTIA",
//     "allocatedRoom": {
//       "connect": {
//         "id": "cjqxvz8l3igek09178xuj77ye"
//       }
//     }
//   }
// }
