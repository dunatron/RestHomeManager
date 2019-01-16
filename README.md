# About

This project is simply to get some sort of checklist automation happening because we pay our garegivers peanuts and thes people seem not to be able to do their job very well.

### 5W1H

### More...

- We have `Organisations`, `Users`, `Patients`
- An Organisation can have many Users
- An Organisation can Have many Patients
- A user can belong to many Organisations
- A patinet can only belong to 1 organisation
- A patient can not be assigned an org.

### ToDo

- Add WaitingList Model
- Add Calender Model
- Write all the functions for our backend model
- Write the entire front end

## SERVER

### Queries

#### allPatients

```JS
query allPatients($where:PatientWhereInput){
  patients(where:$where){
    name
  }
}
{
  "where": {
    "organisation": {
      "id": "cjqvqkzmkergo0917lfi1jd2z"
    }
  }
}
```

#### patient

```JS
query patient($where:PatientWhereUniqueInput!){
  patient(where: $where) {
    id
    name
    dob
    careLevel
    family{
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
    tasks(where:{
      complete:false
    }) {
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
{
  "where": {
    "id": "cjqxajk5aotnu0a71z4ppzbyu"
  }
}
```

### FEEDS

#### patientFeed

```JS
query patientFeed(
  $where:PatientWhereInput,
  $orderBy:PatientOrderByInput,
  $skip:Int,
  $after:String,
  $before:String,
  $first:Int,
  $last:Int
){
  patientFeed(
    where:$where,
    orderBy:$orderBy,
    skip:$skip,
    after:$after,
    before:$before,
    first:$first,
    last:$last
  ) {
    count
    patients {
      id
      name
      dob
      careLevel

      tasks {
        id
        name
        note
        priorityLevel
      }
    }
  }

}
```

#### roomFeed

```JS
query roomFeed(
  $where:RoomWhereInput,
  $orderBy:RoomOrderByInput,
  $skip:Int,
  $after:String,
  $before:String,
  $first:Int,
  $last:Int
){
  roomFeed(
    where:$where,
    orderBy:$orderBy,
    skip:$skip,
    after:$after,
    before:$before,
    first:$first,
    last:$last
  ) {
    count
    rooms {
      id
      name
      size
      patients {
        id
        name
      }
    }
  }

}
```

### Mutations

#### createPatient

```JS
mutation createPatient($data:PatientCreateInput!) {
  createPatient(data: $data) {
    id
    name
    dob
    careLevel
    family{
      id
      name
    }
    contacts{
      id
      name
      address
    }
  }
}

{
  "data": {
    "name": "Patient 5",
    "dob": "2018-09-28T14:33:47.264Z",
    "careLevel": "REST_HOME",
    "family": {
      "connect":[
        {
          "id": "cjqtbjowuao1d0a71pxld5e34"
        },
        {
          "id": "cjqtfjv0t9u780917rrno9p0y"
        }
      ]
    },
    "organisation": {
      "connect": {
        "id": "cjqvqkzmkergo0917lfi1jd2z"
      }
    }
  }
}
```

#### updatePatient

```JS
mutation updatePatient(
  $data: PatientUpdateInput!,
  $where:PatientWhereUniqueInput!
) {
  updatePatient(
    data:$data,
    where:$where
  ){
    id
    name
  }
}

// data
{
  "where": {
    "id": "cjqxmjus4q95l0a71piiz7m1s"
  },
  "data": {
    "name": "New Patient Name",
    "dob": "2018-09-28T14:33:47.264Z",
    "careLevel": "DEMENTIA",
    "allocatedRoom": {
      "connect": {
        "id": "cjqxvz8l3igek09178xuj77ye"
      }
    }
  }
}
```

#### createRoom

```JS
mutation createRoom($data:RoomCreateInput!){
  createRoom(data:$data) {
    id
    name
    size
    patients {
      id
      name
    }
    organisation {
      id
      name
    }
  }
}
{
  "data": {
    "name": "Room One",
    "size": 2
  }
}
```
