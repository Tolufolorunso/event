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

 /events

```

### Filter Events by category Using HTTP GET Method

```
// Endpoint is

 /events?category=social

```

### Get A single Event Using HTTP GET Method

```
//Endpoint is

/events/:eventID

```

### Add New Event Using HTTP POST Method

```
//Endpoint is

/Events

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

/events/:eventID
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

/events/:eventID

```
