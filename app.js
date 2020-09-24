
const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors') //try/catch structure eliminating
const cors = require('cors')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } )
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app










// // mongoose.connect(config.MONGODB_URI, {})

// // const bodyParser = require('body-parser')
// // require('dotenv').config()

// // app.use(bodyParser.json())

// // const morgan = require('morgan')

// // // const mongoose = require('mongoose')
// // const Note = require('./models/note')


// app.use(cors())

// app.use(express.json())

// app.use(express.static('build'))

// if (process.argv.length < 2) {
//   console.log(
//     'please provide the password as an argument: node mango.js <password>'
//   )
//   process.exit(1)
// }

// const notesRouter = require('./controllers/notes')
// app.use('/api/notes', notesRouter)

// app.get('/', (req, res) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
//   // res.send('<h1>Hello World! this is the note-fullstack backend application.</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   // res.json(notes)
//   Note.find({}).then(notes => {
//     console.log('find method')
//     response.json(notes.map(note => note.toJSON()))
//     console.log(notes)
//   })
// })


// app.get('/api/notes/:id', (request, response) => {
//   // const id = Number(request.params.id)
//   //console.log(id)

//   Note.findById(request.params.id).then(note => {
//     response.json(note.toJSON())
//   })
// })

// app.delete('/api/notes/:id', (request, response) => {


//   Note.findOneAndRemove({ _id: request.params.id }, request.body, function(err,data)
//   {
//     if(!err){
//       console.log('Deleted')
//     }

//     response.status(204).end()

//   })

//   // Note.findByIdAndDelete(request.params.id)

//   // const id = request.params.id
//   // console.log(id)
//   // notes = notes.filter(note => note.id !== id)

//   // response.status(204).end()
// })

// // app.delete('/api/notes/:id', (request, response) => {
// //   const id = request.params.id
// //   notes = notes.filter(note => note.id !== id)

// //   response.status(204).end()
// // })


// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (body.content === undefined) {
//     return response.status(400).json({
//       error: 'content missing'
//     })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   note.save().then(savedNote => {
//     response.json(savedNote.toJSON())
//   })
// })



// app.use(morgan('short'))
// app.use(function(req, res, next){
//   res.send('ok')
// })

