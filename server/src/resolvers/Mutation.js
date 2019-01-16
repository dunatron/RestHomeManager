const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId, getOrgId } = require("../utils")

async function signup(parent, args, context, info) {
  if (args.email.length < 3) {
    throw new Error("Email should have more than 3 characters")
  }
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password },
    },
    `{ id password name email role }`
  )

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.db.query.user(
    { where: { email: args.email } },
    ` { id password name email role } `
  )
  if (!user) {
    throw new Error("No such user found")
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }

  console.log("A User being logged in... -> ", user)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

function changeUserRole(parent, args, context, info) {
  return context.db.mutation.updateUser(
    {
      data: {
        role: args.role,
      },
      where: { id: args.id },
    },
    info
  )
}

function addOrgToUser(parent, args, context, info) {
  return context.db.mutation.updateUser(
    {
      data: {
        organisations: {
          connect: { id: args.orgId },
        },
      },
      where: { id: args.userId },
    },
    info
  )
}

function removeOrgFromUser(parent, args, context, info) {
  return context.db.mutation.updateUser(
    {
      data: {
        organisations: {
          disconnect: { id: args.orgId },
        },
      },
      where: { id: args.userId },
    },
    info
  )
}

async function createPatient(parent, args, context, info) {
  const patient = await context.db.mutation.createPatient(
    {
      data: { ...args.data },
    },
    info
  )
  return patient
}

async function createRoom(parent, args, context, info) {
  const room = await context.db.mutation.createRoom(
    {
      data: { ...args.data },
    },
    info
  )
  return room
}

async function updatePatient(parent, args, context, info) {
  const patient = await context.db.mutation.updatePatient(
    {
      data: { ...args.data },
      where: { ...args.where },
    },
    info
  )
  return patient
}

module.exports = {
  signup,
  login,
  changeUserRole,
  addOrgToUser,
  removeOrgFromUser,
  createPatient,
  createRoom,
  updatePatient,
}
