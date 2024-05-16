const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const fs = require('fs').promises;

const User = require("../models/user.model")
const { generateCrudMethods } = require("../services/");
const { EventEmitterAsyncResource } = require('events');

const userCrud = generateCrudMethods(User)

router.get('/', (req, res, next) => {
    userCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.post('/register', async (req, res, next) => {
    userCrud.create(await userCrud.hashPassword(req.body))
        .then(data => res.status(201).send(data))
        .catch(err => next(err))
})

router.post('/login', async (req, res, next) => {

    const user = await userCrud.getByEmail(req.body)
    if (!user)
        return res.status(404).send({ message: 'user not found' })

    const match = await userCrud.passwordMatch(req.body, user.password)
    if (!match)
        return res.status(400).send({ message: 'invalid credentials' })

    const token = jwt.sign({ _id: user._id }, "secret")
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 })
    res.status(200).send({ message: 'Success' })
})

router.get('/user', async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        if (!claims)
            return res.status(400).send({ message: 'Unauthenticated' })

        const userData = await userCrud.getById(claims._id)
        const user = await userData.toJSON()
        const { password, ...rest } = user
        res.status(200).send(rest)
    } catch {
        return res.status(400).send({ message: "Unauthenticated" })
    }

})

router.post('/logout', (req, res, next) => {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logged out' });
})

router.post('/update', (req, res) => {
    const { _id, data } = req.body
    User.findOneAndUpdate({_id: _id}, data).then((data) => {
        console.log(JSON.stringify(data))
        res.clearCookie('jwt');
        const token = jwt.sign({_id: res._id }, "secret")
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 })
        res.status(200).send({ message: 'Success' })
    }
    )
})

// router.get('/files', async (req, res) => {
//     try {
//       const files = await fs.readdir('C:/Projects/MEAN-App/server')
//       const fileData = files.map(file => ({
//         name: file,
//       }))
//       res.status(200).json(fileData);
//     } catch (error) {
//       console.error('Error retrieving project file metadata:', error);
//       res.status(500).send({ message: 'Internal server error' });
//     }
//   });


module.exports = router