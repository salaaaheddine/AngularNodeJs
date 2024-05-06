const express = require('express')
const router = express.Router()

const User = require("../models/user.model")
const { generateCrudMethods } = require("../services/")

const userCrud = generateCrudMethods(User)

router.get('/', (req, res) => {
    userCrud.getAll()
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

router.get('/:email', (req, res) => {
    const email = req.params.email
    User.findOne({ email })
        .then(user => {
            if (user)
                res.send(user)
            else
                res.status(404).json({
                    error: 'No user with the given email: ' + req.params.email
                })
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    User.create(req.body)
        .then(data => res.status(201).send(data))
        .catch(err => console.log(err))
})

module.exports = router