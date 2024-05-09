const bycrypt = require('bcryptjs')
exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getById: id => Model.findById(id),
        getByEmail: record => {
            const email = record.email
            return Model.findOne({email})
        },
        hashPassword: async record => {
            const salt = await bycrypt.genSalt(10)
            record.password = await bycrypt.hash(record.password, salt)
            return record},
        create: record => Model.create(record),
        passwordMatch: async (record, hashedPassword) => await bycrypt.compare(record.password, hashedPassword)
    }
}
