const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'Password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  catch(error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify(users, null, 4))
})

usersRouter.use((error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  // Handle other types of errors as needed
  return next(error)
})

module.exports = usersRouter
