const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require("../models/user.model")
const { generateCrudMethods } = require("../services/")

const userCrud = generateCrudMethods(User)

router.get('/', (req, res, next) => {
    userCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    userCrud.getById(req.params.id)
        .then(user => {
            if (user)
                res.send(user)
            else
                res.status(404).json({
                    error: 'no user found with the given id: ' + req.params.id
                })
        })
        .catch(err => next(err))
})

router.post('/register', async (req, res, next) => {
    userCrud.create(await userCrud.hashPassword(req.body))
        .then(data => res.status(201).send(data))
        .catch(err => next(err))
})

router.post('/login', async (req, res, next) => {
    const user = await userCrud.getByEmail(req.body)
    if(!user)
        res.status(404).send({message:'user not found'})

    const match = await userCrud.passwordMatch(req.body, user.password)
    if(!match)
        res.status(400).send(await userCrud.hashPassword(req.body))

    const token = jwt.sign({_id: user._id}, 'secret')
    res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 3600 * 1000})
})

module.exports = router