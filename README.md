# Parking Management System

## Overview

This project is a comprehensive web application developed using NestJS for the backend. It provides a seamless and efficient way to manage parking reservations, user authentication.

## Features

- **User Authentication and Authorization**: Securely handle user login and role-based access control.
- **Parking Reservation System**: Users can book and manage parking spaces.
- **Role-Based Access Control**: Differentiate access for users and admins with roles.
- **Swagger Documentation**: Comprehensive API documentation using Swagger.

## Setup Instructions 

### Backend 

1. **Install dependencies**: 
  ```bash 
  cd backend npm install 
  ``` 

2. **Setup environment variables**: Create a `.env` file in the `backend` directory and add the following: 
```plaintext 
DATABASE_HOST=localhost 
DATABASE_PORT=3306 
DATABASE_USER=your_db_user 
DATABASE_PASS=your_db_password 
DATABASE_NAME=your_db_name 
JWT_SECRET=your_jwt_secret 
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Database 

1. **Run the database with Docker**: 
```bash 
docker-compose up -d 
```

## Usage

### Accessing Swagger Documentation 
You can access the Swagger API documentation at `http://localhost:5000/api`