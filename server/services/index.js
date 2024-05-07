const bycrypt = require('bcryptjs')
exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getByEmail: email => Model.findOne({email}),
        create: async record => {
            const salt = await bycrypt.genSalt(10)
            const hashedPassword = await bycrypt.hash(record.password, salt)
            const newRecord = new Model({
                "fullname": record.fullname,
                "email": record.email,
                "password": hashedPassword
            })
            const savedRecord = await newRecord.save()
            return savedRecord
        }
    }
}
