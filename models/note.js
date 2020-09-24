require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


// const url = process.env.MONGODB_URI

// const password = process.argv[2]

// const url = `mongodb+srv://fullstack-note:${password}@cluster0.rpryk.mongodb.net/note-app`

// console.log('connecting to', url)
// console.log('connecting to', URL)


// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(result => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: Date,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)