# Buuks API
"Buuks" instead of "books"... Another angle 😉 The API allows a user to interact with a database made for storing books. API is able to do the following: CRUD operations for books, User signup, authentication (and basic authorization), PDF file upload to Cloudinary. More descriptive explanations in the sections below.


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

## POST /users/signup
**Request body**
````
{
    "email": "string",
    "password": "string",
    "passwordConfirmation": "string",
    "name": "string"
}
````

**Example response**
````
{
    "email": "string",
    "name": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
````


## POST /auth/login
**Request body**
````
{
    "email": "string",
    "password": "string"
}
````

**Example response**
````
{
    "accessToken": "string",
    "refreshToken": "string"
}
````

## GET /auth/sessions
````
No response body
````

**Example response**
````
[
    {
        "_id": "string",
        "user": "string",
        "password": boolean,
        "userAgent": "string",
        "createdAt": "string",
        "updatedAt": "string",
    },
    // etc.
]
````

## DELETE /auth/sessions
````
No response body
````

**Example response**
````
{
    "accessToken": null,
    "refreshToken": null
}
````

### POST /books
**Request body**

Use form-data (in postman). The **title** and **description** keys should have value of type **string**. The **pdf** key should have the value of type file.

**Example response**
````
{
    "message": "string",
    "book": {
        "_id": "string",
        "title": "string",
        "description": "string",
        "pdf": "string",
        "user": "string",
        "request": {
            "type": "string",
            "url": "string",
            "description": "string"
        }
    }
}
````

## GET /books/user/:userId
````
No response body
````

**Example response**
````
{
    "count": number,
    "description": "string",
    "books": [
        {
            "_id": "string",
            "title": "string",
            "description": "string",
            "pdf": "string",
            "request": {
                "type": "string",
                "url": "string",
                "description": "string"
            }
        },
        // etc.
    ]
}
````

## GET /books/:bookId

````
No response body
````

**Example response**
````
{
    "_id": "string",
    "title": "string",
    "description": "string",
    "pdf": "string",
    "user": "string",
    "request": {
        "type": "string",
        "url": "string",
        "description": "string"
    }
}
````

## DELETE /books/:bookId

````
No response body
````

**Example response**
````
{
    "message": "string",
    "request": {
        "type": "string",
        "url": "string",
        "description": "string"
    }
}
````

