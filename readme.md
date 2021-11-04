# myFlix API

This is the server-side component for [myFlix-React](https://github.com/ellenmariestuder/myFlix-React) and [myFlix-Angular](https://github.com/ellenmariestuder/myFlix-Angular). This API stores detailed movie, director, and genre data. Users can sign up, view all movies, create a list of their favorite movies, and manage their personal data. 

&nbsp;


## Features 
* Returns list of all movies to user 
* Returns data on a single movie (description, director, genre) by movie title 
* Returns detailed director information (bio, birth year, death year) by director name 
* Returns detailed genre information (description) by genre name
* Allows new users to register 
* Allows users to update personal info (username, password, email, birthdate) 
* Allows users to add/remove movies to their list of favorites 
* Allows existing users to deregister 

&nbsp;


## Technologies 
* JavaScript 
* MongoDB
* Mongoose 
* Express 
* Node.js 

&nbsp;


## API Endpoints 

Request | URL | Method | Body Data 
--- | --- | --- | --- | 
Return a list of all movies |  /movies | GET | none 
Return data about a single movie, by title |  /movies/:Title | GET |  none
Return data about a director, by name |  /director/:Name | GET | none 
Return data about a genre, by name |  /genre/:Name | GET | none 
Return list of movies by director | /movies/director/:Name | GET | none
Return list of movies by genre | /movies/genre/:Name | GET | none
Allow new users to register |  /users | POST | A JSON object holding data about the user to add (username, password, email, birthday) 
Return logged-in user's data |  /users/:Username | GET | none 
Allow new users to update their user data |  /users/:Username | PUT | A JSON object holding data about the user to update (username, password, email, birthday)  
Allow existing users to deregister |  /users/:Username | DELETE | none 
Allow users to add a movie to their list of favorites |  /users/:Username/Movies/:movieID | POST | none 
Allow users to remove a movie to their list of favorites |  /users/:Username/Movies/:movieID | DELETE | none 

&nbsp;

See more detailed documentation [here](https://getmyflix.herokuapp.com/documentation.html). 

&nbsp;

## Data Structure
```
            /                                           \
            |   _id:         ObjectId,                  |
            |   title:       string,                    | 
            |   description: string,                    |
            |   imageUrl:    string,                    |
            |   director:       .name:        string,   |
movies =    |                   .bio:         string,   |
            |                   .birth:       number,   |
            |                   .death:       number,   |
            |                   .movies:      array,    |
            |   genre:          .name:        string,   |
            |                   .description: string,   |
            |                   .movies:      array,    |
            \                                           /
```
```
            /                           \
            |   _id:        ObjectId,   |
            |   name:       string,     |
directors = |   bio:        string,     |
            |   birthyear:  date,       |
            |   deathyear:  date,       |
            \                           /
```

```

            /                             \
            |   _id:          ObjectId,   |
genres =    |   name:         string,     |  
            |   description:  string,     |
            \                             /
```

```
            /                                \
            |   _id:             ObjectId,   |
            |   username:        string,     |
users =     |   password:        string,     |
            |   email:           string,     |
            |   favoriteMovies:  array,      |
            \                                /
```