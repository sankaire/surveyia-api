# surveyia-api

## available endpoints
- Base url 
```
https://surveyia-api.herokuapp.com/api
```
### Authentication
- signup: `/auth/signup` http verb `POST`
- Request body
```json
{
  "email":"username@gmail.com",
  "name":"username",
  "phone":"+25412345678",
  "password":"12345"
}
```
- success response 
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "name": "username",
    "phone": "+25412345678",
    "email": "username@gmail.com",
    "password": "$2b$10$pecrSS1eZySSgpm4.4GcCu5vhVagNsUua0ZFaT0cAjfKPbi6Whn0C",
    "_id": "63d2497f17efc70d5c9693ff",
    "createdAt": "2023-01-26T09:35:59.584Z",
    "updatedAt": "2023-01-26T09:35:59.584Z",
    "__v": 0
  }
}
```
- Signin: `/auth/signin` http verb `POST`
- Request body 
```json
{
  "email":"username@gmail.com",
  "password":"12345"
}
```
- Sucess Response 
```json
{
  "success": true,
  "message": "Login successfull",
  "data": {
    "user_id": "63d2497f17efc70d5c9693ff",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjNkMjQ5N2YxN2VmYzcwZDVjOTY5M2ZmIiwiaWF0IjoxNjc0NzI2MDc4LCJleHAiOjE2NzQ3Mjk2Nzh9.8RR8A7CZ_OFi10PEakfXvw3fAcMideKQ-pNIIKTq2Bo"
  }
}
```
- Wrong Password Response
```json
{
  "success": true,
  "message": "Wrong password",
  "data": null
}
```
## Questionares
- create questionare `create/questionare` http verb `POST`
- Request Body
```json
{
  "title":"First questionare",
  "payout":"10",
  "description":"This is the first questionare",
  "questions":[
    {
     "type":"multiple choice",
     "optional":false,
     "question":"How are you today?",
     "choices":["good", "ok", "bad"]
    },
        {
     "type":"multiple choice",
     "optional":false,
     "question":"How are you today?",
     "choices":["good", "ok", "bad"]
    }
  ]
}
```
- Authorization `Bearer <token>`
- Respone Body
```json
{
  "success": true,
  "message": "Question created",
  "data": {
    "user_id": "63d2497f17efc70d5c9693ff",
    "title": "First questionare",
    "payaout": "10",
    "description": "This is the first questionare",
    "questions": [
      {
        "type": "multiple choice",
        "optional": false,
        "question": "How are you today?",
        "choices": [
          "good",
          "ok",
          "bad"
        ]
      },
      {
        "type": "multiple choice",
        "optional": false,
        "question": "How are you today?",
        "choices": [
          "good",
          "ok",
          "bad"
        ]
      }
    ],
    "_id": "63d26859ff6fb892c6ee96f2",
    "createdAt": "2023-01-26T11:47:37.786Z",
    "updatedAt": "2023-01-26T11:47:37.786Z",
    "__v": 0
  }
}
```

