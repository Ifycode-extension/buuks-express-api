# Buuks API
"Buuks" instead of "books"... Another angle 😉


## API design and usage

|Methods & endpoints|Description|Request body|Auth (access token)|
|--|--|:--:|:--:|
|POST /users/signup|Create new user| email, password, passwordConfirmation, name|No need for access token |
|POST /auth/login|Sign in as existing user, create access token and refresh token for use in GET auth/sessions and DELETE auth/sessions endpoints|email, password|Access token generated here (see sample response)|
|GET /auth/sessions|Gets all users sessions made through the POST /auth/login endpoint. Also reissues an access token (if access token is expired and there's refresh token) |No request body|Use access token from the POST /auth/login response|
|DELETE /auth/sessions|Deletes the last recorded session created through the POST /auth/login endpoint (it's supposed to update it and not delete, should fix this later)|No request body|Use access token from the POST /auth/login response|
|POST /books|Create a new book (authenticated user)|title, description, pdf (file upload)|Use access token from the POST /auth/login response|
|GET /books/user/:userId|Get/view only books created by a particular user, using the user ID|No request body|No need for access token|
|GET /books/:bookId|Get/view a book stored in the database, using the book ID|No request body|No need for access token|
|DELETE /books/:bookId|Delete a book from the database, using the book ID|No request body|Use access token from the POST /auth/login response|


<!--

### POST /users
Request body:
````
{
    "email": "string",
    "password": "string",
    "passwordConfirmation": "string",
    "name": "string"
}
````

### POST /sessions
Request body:
````
{
    "email": "string",
    "password": "string"
}
````

### POST /books
Request body:
````
{
    "title": "string",
    "description": "string"
}
````

















API design (and usage in postman) in progress:

|Method & endpoint|Description|Request body|Auth (supply token)|
|--|--|:--:|:--:|
|POST /users|Create new user and sign in| email, password, passwordConfirmation, name|No|
|POST /sessions|Sign in as existing user, create access token and refresh token for use in GET /sessions and DELETE /sessions endpoints|email, password|No|
|GET /sessions|Gets all users sessions made through POST /sessions. Also reissues an access token (if access token is expired and there's refresh token) |None|Yes|
|DELETE /sessions|Deletes the last recorded session by POST /session (it's supposed to update it and not delete, should fix this later)|None|Yes|
|POST /books|Create a new book (not tied to a user or auth yet)|title, description|
|GET /books|Get all books (not tied to a user or auth yet)|None|
|GET /books/:bookId|Get a book by its ID (not tied to a user or auth yet)|None|
|DELETE /books/:bookId|Delete a book by its ID (not tied to a user or auth yet)|None|

### POST /users
Request body:
````
{
    "email": "string",
    "password": "string",
    "passwordConfirmation": "string",
    "name": "string"
}
````

### POST /sessions
Request body:
````
{
    "email": "string",
    "password": "string"
}
````

### POST /books
Request body:
````
{
    "title": "string",
    "description": "string"
}
````
-->
