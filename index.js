// import env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// connect to database
const url = process.env.MONGODB_URI;
mongoose.connect(url);

// create a schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create a model
const Person = mongoose.model('Person', personSchema);

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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((curr) => curr.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
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

const randomID = () => {
  return Math.floor(Math.random() * 100);
};

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
  } else if (persons.find((curr) => curr.name === body.name) !== undefined) {
    return response.status(406).json({ error: 'name must be unique' });
  }

  const person = {
    id: randomID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.listen(process.env.PORT);
