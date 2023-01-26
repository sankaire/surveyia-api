# surveyia-api

## available endpoints
- Base url 
```
https://surveyia-api.herokuapp.com/api
```
### Authentication
- signup: `/auth/signup http verb `POST`
- Requestbody
```
{
  "email":"username@gmail.com",
  "name":"username",
  "phone":"+25412345678",
  "password":"12345"
}
```
- success response 
```
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

