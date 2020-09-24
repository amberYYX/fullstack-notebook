const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const jwt = require('jsonwebtoken')



// try {
//   // do the async operations here
// } catch(exception) {
//   next(exception)
// }

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async(request, response) => {
  const notes = await Note.find({})
  response.json(notes)

})


notesRouter.get('/:id', async(request, response) => {
  const note = await Note.findById(request.params.id)

  if(note){
    response.json(note)
  }else {
    response.status(404).end()
  }
})



notesRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  // note.save()
  //   .then(savedNote => {
  //     response.json(savedNote)
  //   })
  //   .catch(error => next(error))

  // const savedNote = await note.save()
  // response.json(savedNote)

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

notesRouter.delete('/:id', async(request, response) => {

  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

// notesRouter.put('/:id', async(request, response, next) => {

//   try{
//     const body = request.body

//     const note = {
//       content: body.content,
//       important: body.important,
//     }
//     await Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     response.json(updatedNote)
//   }catch(exception){
//     next(exception)
// })


module.exports = notesRouter