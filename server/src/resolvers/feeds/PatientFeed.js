function patients(parent, args, context, info) {
  return context.db.query.patients(
    { where: { id_in: parent.patientIds } },
    info
  )
}

module.exports = {
  patients,
}
