const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.ckn2c.mongodb.net/phonebook?retryWrites=true&w=majority`;

// open connection to database
mongoose.connect(url);

// create a schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create a model
const Person = mongoose.model('Person', personSchema);

// for submitting data to db
// node mongo.js password Tom 012340918
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((res) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

// for getting data from db
// node mongo.js password
if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
