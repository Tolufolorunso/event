# Note: This is a task given by ReskillAmericans training. Building and improving it according to instructors instruction. Thanks

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine.

## Installation

This is node.js API. Installation is done using npm install command:

```
$ npm install
```

## Start the App

```
$ npm run dev

```

All the packages needed for this API to works will be installed with this above
command.

### Clone

- Clone this repo to your local machine using
  `https://github.com/Tolufolorunso/event.git`

### The HTTP verbs used

- GET: To retrive resources
- POST: To create resources
- PUT: To Update resources
- DELETE: To Update resources

## Handling all the four routes

### Get All Events Using HTTP GET Method

```
// Endpoint is

 /api/v1/events

```

### Filter Events by category Using HTTP GET Method

```
// Endpoint is

 /api/v1/events?category=social

```

### Get A single Event Using HTTP GET Method

```
//Endpoint is

/api/v1/events/:eventID

```

### Add New Event Using HTTP POST Method

```
//Endpoint is

/api/v1/events

{
    "title": "tolulope's wedding",
    "category": "social",
    "cost": 4050,
    "publisher": "Tolulope"
}

```

### Update a Event Using HTTP PUT Method

```
//Endpoint is

/api/v1/events/:eventID
{
    "title": "Seyi ogunjuyigbe's wedding",
    "category": "social",
    "cost": 4566,
    "publisher": "Tolulope"
}

```

### Delete a Event Using HTTP DELETE Method

```
//Endpoint is

/api/v1/events/:eventID

```

## Authentication

- For new User to register

```
//Endpoint is

/api/v1/users/register
{
    "firstname": "tolulope",
    "lastname": "folorunso",
    "email": "tolu@reskillamericans.org",
    "password": "password"
}

-Response is
-status code is 201 created

{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTQzYzJhYzExYjg1MDA2ODUyYzg0NSIsInVzZXJuYW1lIjoidG9sdWZvbG9ydW5zbyIsImZpcnN0bmFtZSI6InRvbHVsb3BlIiwibGFzdG5hbWUiOiJmb2xvcnVuc28iLCJpYXQiOjE2MjEzNzYwNDIsImV4cCI6MTYyMTM3OTY0Mn0.kKswaNRv1PzcEpdmf8EF66F0DWEBk2DffKVOhfBUmVo"
}
```

- For login

```
//Endpoint is

/api/v1/users/login
{
    "email": "tolufolorunso",
    "password": "password"
}

-Response is
-status code is 200 Ok

{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTQzYzJhYzExYjg1MDA2ODUyYzg0NSIsInVzZXJuYW1lIjoidG9sdWZvbG9ydW5zbyIsImZpcnN0bmFtZSI6InRvbHVsb3BlIiwibGFzdG5hbWUiOiJmb2xvcnVuc28iLCJpYXQiOjE2MjEzNzYxMjksImV4cCI6MTYyMTM3OTcyOX0.AQCnipDBOwMS96LG_0h-4W7yO9nPkbKaBa6cs7P2qRs",
    "user": {
        "id": "60a43c2ac11b85006852c845",
        "email": "tolu@reskillamericans.org",
        "firstname": "tolulope",
        "lastname": "folorunso"
    }
}
```
