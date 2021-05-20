const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

let movies = [
  {
    title: 'Two Weeks Notice',
    description: 'A 2002 American romantic comedy film starring Hugh Grant and Sandra Bullock.',
    genre: 'Romantic Comedy',
    director: 'Marc Lawrence',
    imageURL: 'https://popcorndialogues.com/wp-content/uploads/2010/05/Two-Weeks-Notice-Poster.jpeg',
    featured: 'Y'
  },
  {
    title: 'Jesus Christ SuperStar',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Enchanted',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'My Cousin Vinny',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Uncle Buck',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Planes, Trains, and Automobiles',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Big Fish',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Get Out',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Hereditary',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  },
  {
    title: 'Midsomar',
    description: '',
    genre: '',
    director: '',
    imageURL: '',
    featured: ''
  }
];

let genres = [
  {
    type: 'Romantic Comedy',
    description: 'Romantic comedy (also known as romcom or rom-com) is a subgenre of comedy and slice-of-life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas.'
  }
];

let directors = [
  {
    name: 'Marc Lawrence',
    birthYear: 1959,
    deathYear: '',
    bio: 'Marc Lawrence is an American director, screenwriter, and producer. Lawrence is best known for his numerous collaborations with Sandra Bullock and Hugh Grant.'
  }
];

let users = [
  {
    name: 'Sarah Smith',
    userName: 'ss123',
    email: 'ss123@gmail.com',
    password: '123password321',
    favoriteMovies: { }
  }
];

//------------------------------------------------------------------------------

// Landing welcome message
 app.get('/', (req, res) => {
   res.send('Welcome to myFlix!')
 });

// Return list of all  movies
app.get('/movies', (req, res) => {
  res.send('Here is a list of all movies in the data base.')
});

// Return data about a single movie by title
// (description, genre, director, image URL, featured (Y/N))
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Return data (description) about a genre by genre title
app.get('/genres/:type', (req, res) => {
  res.json(genres.find((genre) =>
    { return genre.type === req.params.type }));
});

// Return data about a director by name
// (bio, birth year, death year)
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return director.name === req.params.name }));
  });

// Allow new users to register
app.post('/users/:name', (req, res) => {
  res.send('A new profile was created for ' + req.params.name)
});

// Allow users to update their username
app.put('/users/:username/', (req, res) => {
  res.send('The user: ' + req.params.username + ' was successfully updated.')
})

// Allow users to add a movie to their list of favorites
// (show text that movie has been added)
app.post('/users/favoriteMovies/:title', (req, res) => {
res.send('The movie: ' + req.params.title + ' was successfully added to your list of favorites.')
});

// Allow users to remove a movie frm their list of favorites
// (show text that movie has been removed)
app.delete('/users/favoriteMovies/:title', (req, res) => {
  res.send(req.params.title + ' was successfully deleted from your list of favorites.')
});

// Allow existing users to deregister
// (show text that user email has been removed )
app.delete('/users/:email', (req, res) => {
  res.send('Account associated with email address "' + req.params.email + '" was deleted.')
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
