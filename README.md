# Task Management System - API Documentation

## Overview
The Task Management System is a Node.js application built with Express.js and TypeORM. It provides a RESTful API to manage tasks, users, and roles. The system allows for task creation, retrieval, updating, and deletion with role-based access control. It also supports filtering tasks based on priority, status, and assigned user.

### Packages Used:
1. **express**: Fast, unopinionated, minimalist web framework for Node.js.
2. **typeorm**: An ORM (Object Relational Mapper) for TypeScript and JavaScript (ES7, ES6, ES5).
3. **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for authentication.
4. **bcryptjs**: Library for hashing passwords.
5. **dotenv**: Loads environment variables from a `.env` file into `process.env`.
6. **reflect-metadata**: Enables decorators for TypeScript and JavaScript.

### Installation:

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone (https://github.com/saiteja-kolagani/Task-Management-System.git)
   cd task-management-system
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following environment variables:
   ```env
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### 1. **User Authentication**
#### a. Register a New User
   - **URL**: `/api/auth/register`
   - **Method**: `POST`
   - **Description**: Registers a new user with a specific role (e.g., Admin, User).
   - **Request Body Example**:
     ```json
     {
       "username": "saitejakolagani",
       "password": "saitejakolagani123",
       "role": "Admin"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

#### b. Login
   - **URL**: `/api/auth/login`
   - **Method**: `POST`
   - **Description**: Logs in an existing user and returns a JWT token.
   - **Request Body Example**:
     ```json
     {
       "username": "saitejakolagani",
       "password": "saitejakolagani123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "<your_jwt_token>"
     }
     ```

---

### 2. **Task Management**
#### a. Create a Task
   - **URL**: `/api/tasks`
   - **Method**: `POST`
   - **Description**: Creates a new task. Requires `Admin` or `Manager` role.
   - **Request Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Request Body Example**:
     ```json
     {
       "title": "Fix Styling Issues",
       "description": "The header is not responsive enough.",
       "status": "Pending",
       "priority": "High",
       "assignedUserId": 1
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Fix Styling Issues",
       "description": "The header is not responsive enough.",
       "status": "Pending",
       "priority": "High",
       "assignedUserId": 1
     }
     ```

#### b. Get All Tasks with Filters
   - **URL**: `/api/tasks`
   - **Method**: `GET`
   - **Description**: Retrieves all tasks, with optional filtering by priority, status, and assigned user. Requires `Admin`, `Manager`, `Team Lead`, or `Developer` role.
   - **Request Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Request URL Example with Query Parameters**:
     ```
     /api/tasks?priority=High&status=Pending&assignedUserId=1
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "title": "Fix Styling Issues",
         "description": "The header is not responsive enough.",
         "status": "Pending",
         "priority": "High",
         "assignedUserId": 1,
         "assignedUser": {
           "id": 1,
           "username": "saitejakolagani"
         }
       }
     ]
     ```

#### c. Update a Task
   - **URL**: `/api/tasks/:id`
   - **Method**: `PUT`
   - **Description**: Updates an existing task by ID. Requires `Admin` or `Manager` role.
   - **Request Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Request Body Example**:
     ```json
     {
       "title": "Styling Conflict: The Daily Blog",
       "description": "The header is not responsive enough for mobiles.",
       "status": "Pending",
       "priority": "Medium",
       "assignedUserId": 1
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Styling Conflict: The Daily Blog",
       "description": "The header is not responsive enough for mobiles.",
       "status": "Pending",
       "priority": "Medium",
       "assignedUserId": 1
     }
     ```

#### d. Delete a Task
   - **URL**: `/api/tasks/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a task by ID. Requires `Admin` or `Manager` role.
   - **Request Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Response**:
     ```json
     {
       "message": "Task deleted successfully"
     }
     ```

---

## Role-Based Access Control
- **Admin**: Can create, update, and delete tasks.
- **Manager**: Can create, update, and delete tasks.
- **Team Lead**: Can retrieve tasks.
- **Developer**: Can retrieve tasks.

---

### Testing with Postman

1. **Register a New User:**
   - Create a new user by sending a `POST` request to `/api/auth/register` with the required body.

2. **Login:**
   - Obtain a JWT token by sending a `POST` request to `/api/auth/login`. Use this token in the `Authorization` header for subsequent requests.

3. **Create a Task:**
   - Send a `POST` request to `/api/tasks` with the required body and the JWT token in the `Authorization` header.

4. **Retrieve Tasks:**
   - Send a `GET` request to `/api/tasks` with optional query parameters for filtering.

5. **Update a Task:**
   - Send a `PUT` request to `/api/tasks/:id` with the updated task data and the JWT token in the `Authorization` header.

6. **Delete a Task:**
   - Send a `DELETE` request to `/api/tasks/:id` with the JWT token in the `Authorization` header.
