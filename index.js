// import env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// import model for database
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// https://github.com/expressjs/morgan#creating-new-tokens
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

// https://github.com/expressjs/morgan#using-format-string-of-predefined-tokens
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// get person by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.get('/info', (request, response) => {
  let date = new Date();

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  );
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((curr) => curr.id !== id);

  response.status(204).end();
});

// post persons to db
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(404).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return response.status(404).json({
      error: 'number is missing',
    });
  }

  // create object using Person model
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // save to db using Person model method
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.listen(process.env.PORT);
