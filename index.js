const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   });

// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

//------------------------------------------------------------------------------

// Landing welcome message
 app.get('/', (req, res) => {
   res.send('Welcome to myFlix!')
 });

// Return list of all  movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a single movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a genre by genre title
// app.get('/movies/Genre/:Name', (req, res) => {
app.get('/genre/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre.Description);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Return data about a director by name
app.get('/director/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Allow new users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then ((user) => {res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
  });

// Allow users to update their username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
  { $set: {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
   },
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Username/FavoriteMovies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
  { $push: { FavoriteMovies: req.params.MovieID },
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to remove a movie frm their list of favorites
app.delete('/users/:Username/FavoriteMovies/:MovieID', (req, res) => {
  Users.findOneAndRemove({ MovieID: req.params.MovieID })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.MovieID + ' was not found.');
      }
    })
    .catch((err) => {
      console.error (err);
      res.status(500).send('Error: ' + err);
    });
  });

// Allow existing users to deregister
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found.');
      }
    })
    .catch((err) => {
      console.error (err);
      res.status(500).send('Error: ' + err);
    });
});

//------------------------------------------------------------------------------

// Return error for requests that cannot be completed
 app.use((err, req, res, next) => {
   console.log(err.stack);
   res.status(500).send('Something broke!');
 });

// Log local host in console
 app.listen(8080, () => {
   console.log('Your app is listening on port 8080.');
 });
