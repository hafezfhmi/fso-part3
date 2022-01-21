const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

// connect to db
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

// create schema (blueprint)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// reformat our db object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
