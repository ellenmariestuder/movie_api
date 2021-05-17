const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

let movies = [
  {title: 'Two Weeks Notice',
  description: 'description: 2002 American romantic comedy film starring Hugh Grant and Sandra Bullock.',
  genre: 'Romantic Comedy',
  director: 'Marc Lawrence',
  imageURL: '',
  featured: 'Y',
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
    deathYear: 'https://popcorndialogues.com/wp-content/uploads/2010/05/Two-Weeks-Notice-Poster.jpeg',
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

let topMovies = [
  {title: 'Two Weeks Notice',
  rank: 1},
  {title: 'Jesus Christ SuperStar',
  rank: 2},
  {title: 'Enchanted',
  rank: 3},
  {title: 'My Cousin Vinny',
  rank: 4},
  {title: 'Uncle Buck',
  rank: 5},
  {title: 'Trains, Planes, and Automobiles',
  rank: 6},
  {title: 'Big Fish',
  rank: 7},
  {title: 'Get Out',
  rank: 8},
  {title: 'Hereditary',
  rank: 9},
  {title: 'Midsomar',
  rank: 10},
];

//------------------------------------------------------------------------------

// Landing welcome message
 app.get('/', (req, res) => {
   res.send('Welcome to myFlix!')
 });

// // Return list of top movies
//  app.get('/movies', (req, res) => {
//    res.json(topMovies);
//  })

// Return list of all  movies
app.get('/movies', (req, res) => {
  res.json(movies.title);
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
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    // newStudent.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Allow users to update their username
app.put('/users/:email/:userName', (req, res) => {
  let user = users.find((user) => { return user.email === req.params.email });

  if (user) {
    user.username = user(req.params.userName);
    res.status(201).send('Your username has successfully been updated to: ' + req.params.userName);
  } else {
    res.status(404).send('User email ' + req.params.email + ' was not found.');
  }
});

// Allow users to add a movie to their list of favorites
// (show text that movie has been added)
app.post('/users/:favoriteMovies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing movie title in request body';
    res.status(400).send(message);
  } else {
    // newStudent.id = uuid.v4();
    users.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Allow users to remove a movie frm their list of favorites
// (show text that movie has been removed)
app.delete('/users/:favoriteMovies/:title', (req, res) => {
  let movie = users.find((movie) => { return users.title === req.params.title });

  if (movie) {
    users = users.filter((movie) => { return obj.title !== req.params.title });
    res.status(201).send('' + req.params.title + ' was deleted.');
  }
});

// Allow existing users to deregister
// (show text that user email has been removed )
app.delete('/users/:email', (req, res) => {
  let user = users.find((user) => { return users.email === req.params.email });

  if (user) {
    users = users.filter((obj) => { return obj.email !== req.params.email });
    res.status(201).send('Account associated with email address "' + req.params.email + '" was deleted.');
  }
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
