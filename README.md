# Project Name

This project consists of a frontend built with React and a backend built with Node.js.

# Prerequisites

Ensure you have the following tools installed:

- Node.js v20.10.0
- npm 10.2.3

# Installation

1. Clone the repository:

```bash
git clone https://github.com/ensolvers-github-challenges/Vissani-1656d3.git
```

***

# Run easily

To run the application simply double click on the `rundev.sh` file where the necessary dependencies will be installed, the migrations will be run and the application will be built.

***

# Run manually

## Backend

### Navigate to the backend directory:
`cd backend`

### Install dependencies:
`npm install`

### Clear db and run migrations
```
npx sequelize-cli db:migrate:undo --name 20240409071656-add-association-to-note.js
npx sequelize-cli db:migrate:undo --name 20240409071036-add-unique-constraint-to-category.js
npx sequelize-cli db:migrate:undo --name 20240409070910-create-note.js
npx sequelize-cli db:migrate:undo --name 20240409070859-create-category.js

npx sequelize-cli db:migrate --name 20240409070859-create-category.js
npx sequelize-cli db:migrate --name 20240409071036-add-unique-constraint-to-category.js
npx sequelize-cli db:migrate --name 20240409070910-create-note.js
npx sequelize-cli db:migrate --name 20240409071656-add-association-to-note.js
```

### Run seeders
```
npx sequelize-cli db:seed:all
```

## Running the Backend
`npm start`

## Frontend

### Navigate to the frontend directory:
`cd frontend`

### Install dependencies:
`npm install`

# Create a .env file with the following environment variables
```
PORT=3001
REACT_APP_API_URL=http://127.0.0.1:3000/
```

### Running the Frontend
`npm start`

# Others

## Kill process running in necessary ports
It is a requirement that ports 3000 and 3001 be free to run the application. Below is a command shortcut to terminate the processes running on said ports in case it is necessary.
```
netstat -ano | findstr :3000
taskkill /PID <PID> /F

netstat -ano | findstr :3001
taskkill /PID <PID> /F
```