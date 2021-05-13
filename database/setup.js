const mongoose = require('mongoose')

// const DB = process.env.DATABASE_LOCAL
const DB = process.env.DATABASE

module.exports = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((c) => console.log('DATABASE connection successfull'))
}
