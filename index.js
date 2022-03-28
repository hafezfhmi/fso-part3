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
morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

// https://github.com/expressjs/morgan#using-format-string-of-predefined-tokens
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// get all persons
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

// get person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response, next) => {
  let date = new Date();

  Person.find({})
    .then((people) => {
      response.send(
        `<p>Phonebook has info for ${people.length} people</p>
      <p>${date}</p>`
      );
    })
    .catch((error) => next(error));
});

// delete by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// post persons to db
app.post('/api/persons', (request, response, next) => {
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

  // check if name is already in phonebook. Return error if it is else, add new item to database
  Person.find({ name: body.name }).then((res) => {
    if (res.length !== 0) {
      return response.status(404).json({
        error: 'name is already in phonebook',
      });
    } else {
      // create object using Person model
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      // save to db using Person model method
      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

// put/update persons in db
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

app.listen(process.env.PORT);
