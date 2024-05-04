const express = require("express")
const bodyParser = require('body-parser')



//local imports
const connectDB = require("./db.js")


const app = express()


//middleware
app.use(bodyParser.json)


connectDB()
    .then(() => {
        console.log('DB connection succeeded!')
        app.listen(3000,
            () => console.log(`server started at "http://localhost:3000"`))
    })
    .catch(err => console.log(err))
