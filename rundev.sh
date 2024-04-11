#!/bin/bash

kill_npm_start() {
    echo "Killing npm start processes..."
    pkill -f "npm start"
}

trap kill_npm_start EXIT

# Install backend dependencies
cd backend
npm install

# Clear db and run migrations
npx sequelize-cli db:migrate:undo --name 20240409071656-add-association-to-note.js
npx sequelize-cli db:migrate:undo --name 20240409071036-add-unique-constraint-to-category.js
npx sequelize-cli db:migrate:undo --name 20240409070910-create-note.js
npx sequelize-cli db:migrate:undo --name 20240409070859-create-category.js

npx sequelize-cli db:migrate --name 20240409070859-create-category.js
npx sequelize-cli db:migrate --name 20240409071036-add-unique-constraint-to-category.js
npx sequelize-cli db:migrate --name 20240409070910-create-note.js
npx sequelize-cli db:migrate --name 20240409071656-add-association-to-note.js

# Run seeders
npx sequelize-cli db:seed:all

# Start backend server
npm start &
cd ..

# Install frontend dependencies
cd frontend
npm install

# Export environment variables
export PORT=3001
export REACT_APP_API_URL=http://127.0.0.1:3000/

# Start frontend app
npm start
