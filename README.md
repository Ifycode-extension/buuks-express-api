# @Ifycode/buuks-express-api

> Hosted on Heroku: https://buuks-express-api.herokuapp.com

"Buuks" instead of "books"... Another angle 😉 The API allows an (authenticated) user to interact with a database made for storing books. API is built with nodejs, expressjs and mongoDB, and is able to do the following: 
- Create Read Update Delete operations for books which are saved in the database
- User signup, authentication and (basic) authorization
- PDF file upload to Cloudinary 
- Uses zod for resource validation
More descriptive explanations in the sections below.
<br/>

## API design

|Methods & endpoints|Description|Request body|Auth (access token)|
|--|--|:--:|:--:|
|POST /users/signup|Create new user| email, password, passwordConfirmation, name|Not required|
|POST /users/login|Sign in as existing user, create access token and refresh token for use in all endpoints that require access token|email, password|Access token is generated at this endpoint|
|GET /users/sessions|Gets all users sessions made through the POST /users/login endpoint. Also reissues an access token (if access token is expired and there's refresh token) |No request body|Use access token from the POST /users/login response|
|DELETE /users/sessions|Deletes the last recorded session created through the POST /users/login endpoint (Note: this endpoint may need fixing)|No request body|Use access token from the POST /users/login response|
|POST /books|Create a new book (authenticated user)|title, description, pdf (file upload)|Use access token from the POST /users/login response|
|GET /books/user/:userId|Get/view only books created by a particular user, using the user ID|No request body|Use access token from the POST /users/login response|
|GET /books/:bookId|Get/view a book stored in the database, using the book ID|No request body|Not required (for now)|
|PUT /books/:bookId|Update already existing book in the database, using the book ID|title, description, pdf (file upload)|Use access token from the POST /users/login response|
|DELETE /books/:bookId|Delete a book from the database, using the book ID|No request body|Use access token from the POST /users/login response|
<br/>

## Request body and response breakdown

<details>
<summary>POST /users/signup</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
{
    "email": "string",
    "password": "string",
    "passwordConfirmation": "string",
    "name": "string"
}
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
{
    "email": "string",
    "name": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
</pre>
</details>

##

<details>
<summary>POST /users/login</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
{
    "email": "string",
    "password": "string"
}
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
{
    "accessToken": "string",
    "refreshToken": "string"
}
</pre>
</details>

##

<details>
<summary>GET /users/sessions</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
No response body
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
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
</pre>
</details>

##

<details>
<summary>DELETE /users/sessions</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
No response body
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
{
    "accessToken": null,
    "refreshToken": null
}
</pre>
</details>

##

<details>
<summary>POST /books</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
    Use form-data (in postman). The <b>title</b> and <b>description</b> keys should have value of type <b>string</b>. The <b>pdf</b> key should have the value of type file.
<br/><br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
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
</pre>
</details>

##

<details>
<summary>GET /books/user/:userId</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
No response body
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
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
</pre>
</details>

##

<details>
<summary>GET /books/:bookId</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
No response body
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
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
</pre>
</details>


##

<details>
<summary>PUT /books/:bookId</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
    Use form-data (in postman). The <b>title</b> and <b>description</b> keys should have value of type <b>string</b>. The <b>pdf</b> key should have the value of type file.
<br/><br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
{
    "message": "string",
    "request": {
        "type": "string",
        "url": "string",
        "description": "string"
    }
}
</pre>
</details>


##

<details>
<summary>DELETE /books/:bookId</summary>
<br/>
    <b>Request body</b>
    <br/><br/>
<pre>
No response body
</pre>
<br/>
     <b>Successful response (sample)</b>
    <br/><br/>
<pre>
{
    "message": "string",
    "request": {
        "type": "string",
        "url": "string",
        "description": "string"
    }
}
</pre>
</details>
<br/>

## Running the API in development
Set your API_HOST_URL and other needed environment variables in the .env file you create (see example in .env.example file). Use the commands below to run the API locally on your computer.

Install dependencies:
````
npm install
````
Start server for connection to mongoDB (local):
````
npm run dev
````
Start server for connection to mongoDB (Atlas):
````
npm run dev:atlas
````

## Helpful learning (and bug fixing) resources
- [TomDoesTech's youtube video: REST API with Node.js, Express, TypeScript, MongoDB & Zod](https://www.youtube.com/watch?v=BWUi6BS9T5Y)
- [Academind's youtube playlist: Building a RESTful API with Node.js](https://youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)
- [Okpukoro Joe's Article: Uploading Images to Cloudinary Using Multer and ExpressJS](https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54)
- [Yilmaz's stackoverflow answer to multer/clouudinary issue: Converting image to base64 with data-uri with typescript](https://stackoverflow.com/a/67904206/15012852)
- [JWT doc: Introduction to JSON Web Tokens](https://jwt.io/introduction)
