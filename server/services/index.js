exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getByEmail: email => Model.findOne({email}),
        create: record => Model.create(record)
    }
}