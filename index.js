const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use('/documentation.html', express.static('public'));

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

 app.get('/', (req, res) => {
   res.send('Welcome to myFlix!')
 });

 app.get('/movies', (req, res) => {
   res.json(topMovies);
 })


 app.use((err, req, res, next) => {
   console.log(err.stack);
   res.status(500).send('Something broke!');
 });

 app.listen(8080, () => {
   console.log('Your app is listening on port 8080.');
 });
