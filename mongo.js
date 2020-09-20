const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'please provide the password as an argument: node mango.js <password>'
  )
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://fullstack-note:${password}@cluster0.rpryk.mongodb.net/note-app`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  data: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Callback-functions suck',
  data: new Date(),
  important: true,
})

note.save().then((result) => {
  console.log('note saved')
  mongoose.connection.close()
})

// Note.find({}).then((result) => {
//   console.log(result);
// });

// Note.find({important: true}).then((result) => {
//     console.log(result);
//     mongoose.connection.close()
//   });
