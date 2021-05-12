const mongoose = require('mongoose')

// const DB = process.env.DATABASE_LOCAL
const DBString = 'mongodb://localhost:27017/eventDB'

module.exports = () => {
  mongoose
    .connect(DBString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((c) => console.log('DATABASE connection successfull'))
}
