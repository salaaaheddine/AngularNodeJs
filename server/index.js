const express = require("express")
const cors = require('cors')



//local imports
const connectDB = require("./db.js")
const userRoutes = require('./controllers/user.controller.js')
const errorHundler = require('./middlewares')


const app = express()


//middleware
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:4200'}))

app.use(express.json())
app.use('/api/user', userRoutes)
app.use(errorHundler)

connectDB()
    .then(() => {
        console.log('DB connection succeeded!')
        app.listen(3000,
            () => console.log(`server started at "http://localhost:3000"`))
    })
    .catch(err => console.log(err))
