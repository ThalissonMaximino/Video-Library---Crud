# Video-Library---Crud

This API was created for studies proposals.

By Creating this, I could understand more deeply how I can use middlewares to apply security and validations on my app, also it was my first time using a real database, which it was postgress. I learned how to create databases, create tables, manipulate columns and about the types of content that could be added on a database like integer, varchar, boolean, serial and many other.

If you have any questions or opinions about this repository feel free to contact me :) 






## Run Locally

Clone the project

```bash
  git clone https://github.com/ThalissonMaximino/Market-crud.git
```

Go to the project directory

```bash
  cd Market-crud
```
Install dependencies

```bash
  npm install
```
Run Server

```bash
  npm run dev
```


## Endpoints

Method | Endpoint | Responsability
| --- | --- | --- | 
POST| /movies | Create a movie | 
GET| /movies | List all movies | 
GET| /movies/:id | Search movie by Id | 
PATCH| /movies/:id | Atualizes a movie
DELETE| /movies/:id | Delete a movie by Id

## Running Tests

Since this is a study repository, for run tests you need to create a workspace on insomnia or postman and test the routes.


### Requisition Samples
### POST /movies
Movie creation route. It must be possible to create a movie.


Request submission body:
```
{
  "name": "Barbie",
  "category": "OscarMovies",
  "duration": 120,
  "price": 35
}
```

Server response:
```
{
  "id": 1,
  "name": "Barbie",
  "category": "OscarMovies",
  "duration": 120,
  "price": 35
}
Status code:  201 CREATED.
```

### GET /movies

Movie listing route. It should be possible to return all movies from the cinema.


Server response:
```
[
  {
    "id": 1,
    "name": "Barbie",
     "category": "OscarMovies",
     "duration": 120,
     "price": 35
  },
  {
     "id": 2,
     "name": "Oppenheimer",
     "category": "NotOscarMovies",
     "duration": 120,
     "price": 35,
   }
]
Status code:  200 OK.
```
With query parameters:

The example below was performed in the following route: /movies?category=OscarMovies.
Server response:
```
[
  {
    "id": 1,
    "name": "Barbie",
     "category": "OscarMovies",
     "duration": 120,
     "price": 35
  }
]
Status code:  200 OK.
```
### GET /movies/:id

Movie search route. It should be possible to search for a movie by id.

The example below was performed on the following route: /movies/1.
Server response:
```
[
  {
    "id": 1,
    "name": "Barbie",
     "category": "OscarMovies",
     "duration": 120,
     "price": 35
  }
]
Status code:  200 OK.
```
### PATCH /movies/:id
Movie update route. It should be possible to update a movie by id. All fields can be optionally updated.

The example below was performed on the following route: /movies/1.

Request submission body:
```
{
  "name": "Barbie 2 the true blonde"
}
```

Server response:
```
[
  {
    "id": 1,
    "name": "Barbie 2 the true blonde",
     "category": "OscarMovies",
     "duration": 120,
     "price": 35
  }
]
Status code:  200 OK.
```
### DELETE /movies/:id
Movie deletion route. It should be possible to delete a movie by id.

The example below was performed on the following route: /movies/1.

Server response:
```
Status code: 204 NO CONTENT.
```
