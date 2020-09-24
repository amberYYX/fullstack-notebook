const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async(request, response) => {
  /* just user's info*/
  // const users = await User.find({})

  /*user's info, also all the notes are included*/
  // const users = await User.find({}).populate('notes')

  /*user's info, also some notes are included*/
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })

  response.json(users)
})

usersRouter.post('/', async(request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
    notes: []
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports = usersRouter