function rooms(parent, args, context, info) {
  return context.db.query.rooms({ where: { id_in: parent.roomIds } }, info)
}

module.exports = {
  rooms,
}
