const mongoose = require('mongoose')

// This will be taken down after grading
const DB =
  'mongodb+srv://eventDB:QCvd6hO3C84JroeL@cluster0.kia1c.mongodb.net/eventDB?retryWrites=true&w=majority'

// const DB =
//   'mongodb://eventDB:QCvd6hO3C84JroeL@cluster0-shard-00-00.kia1c.mongodb.net:27017,cluster0-shard-00-01.kia1c.mongodb.net:27017,cluster0-shard-00-02.kia1c.mongodb.net:27017/eventDB?ssl=true&replicaSet=atlas-wk1y7k-shard-0&authSource=admin&retryWrites=true&w=majority'

// const DB = 'mongodb://localhost:27017/eventDB'

module.exports = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then((c) => console.log('DATABASE connection successfull'))
}
