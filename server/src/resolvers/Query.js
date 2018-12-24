const { APP_SECRET, getUserId, getOrgId } = require("../utils")

function organisation(root, args, context, info) {
  const orgId = getOrgId(context)
  return context.db.query.organisation({ where: { id: orgId } }, info)
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

module.exports = {
  organisation,
  allOrganisations,
  getUser,
  orgDataConfigs,
  singleDocument,
  documentFeed,
  allUsers,
  info,
}