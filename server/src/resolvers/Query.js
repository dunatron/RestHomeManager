const { APP_SECRET, getUserId, getOrgId } = require("../utils")

function organisation(root, args, context, info) {
  const orgId = getOrgId(context)
  return context.db.query.organisation({ where: { id: orgId } }, info)
}

function allPatients(root, args, context, info) {
  return context.db.query.patients({ where: args.where }, info)
}

function patient(root, args, context, info) {
  return context.db.query.patient({ where: args.where }, info)
}

function allUsers(root, args, context, info) {
  return context.db.query.users({}, info)
}

function allOrganisations(root, args, context, info) {
  return context.db.query.organisations({}, info)
}

function getUser(root, args, context, info) {
  const userId = getUserId(context)
  return context.db.query.user({ where: { id: userId } }, info)
}

function info(root, args, context, info) {
  return "😎 => 🔯 => 🔥 => 💯 => ()"
}

async function patientFeed(parent, args, context, info) {
  // 1.
  const queriedPatients = await context.db.query.patients(
    {
      where: args.where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    },
    `{ id }`
  )

  // 2.
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `
  const patientsConnection = await context.db.query.patientsConnection(
    {},
    countSelectionSet
  )

  // 3
  return {
    count: patientsConnection.aggregate.count,
    patientIds: queriedPatients.map(patient => patient.id),
  }
}

async function roomFeed(parent, args, context, info) {
  // 1.
  const queriedRooms = await context.db.query.rooms(
    {
      where: args.where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    },
    `{ id }`
  )

  // 2.
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `
  const roomsConnection = await context.db.query.roomsConnection(
    {},
    countSelectionSet
  )

  // 3
  return {
    count: roomsConnection.aggregate.count,
    roomIds: queriedRooms.map(room => room.id),
  }
}

module.exports = {
  organisation,
  allOrganisations,
  getUser,
  allUsers,
  info,
  allPatients,
  patientFeed,
  patient,
  roomFeed,
}
