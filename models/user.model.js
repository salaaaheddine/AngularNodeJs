const mongoose = require('mongoose')

module.exports = mongoose.model("User",{
    fullname: {type:String},
    email: {type: String},
    password: {type:String}
})


