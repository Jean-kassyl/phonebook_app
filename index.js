require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Person = require('./models/phonedb');

// instantiate the app
const app = express();

// const data = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ];

// middlewares
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.get('/info', (req, res) => {
  const date = new Date();
  Person.find({}).then((result) => {
    res.write(`<p>Phonebook has info for ${result.length} people</p>`);
    res.write(`<p>${date.toString()}</p>`);
    res.end();
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id).then((result) => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id).then((result) => {
    res.status(204).end();
  })
    .catch((err) => next(err))
});

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' }).then((result) => {
    res.json(result);
  })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  Person.find({}).then((result) => {
    result.forEach((person) => {
      if (person.name === name) {
        res.status(400).json({ error: 'name must be unique' });
      }
    });
    const newPerson = new Person({
      name: name,
      number: number
    });

    newPerson.save().then((result) => {
      res.json(result);
    })
      .catch((err) => next(err));
  });
});

function errorHandler (error, req, res, next) {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json(error.message);
  }

  next(error);
}

app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, () => { console.log(`listening on... ${PORT}`); });