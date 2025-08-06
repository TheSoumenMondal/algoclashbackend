# Problem Service

A microservice for managing coding problems, providing full CRUD operations on the problem collection.

## Features (MVP)

- Create a problem
- Delete a problem
- Edit a problem
- Get a problem by ID
- Get all problems

## .env File Example

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/{your database name}
```

## API Endpoints

| Method | Endpoint                                             | Description                                 |
|--------|-----------------------------------------------------|---------------------------------------------|
| GET    | `/ping`                                             | Check if the server is running              |
| GET    | `/api/v1/problems/ping`                             | Check if controllers are working            |
| POST   | `/api/v1/problems/`                                 | Create a new problem                        |
| PUT    | `/api/v1/problems/{problemID}`                      | Update a problem by ID                      |
| DELETE | `/api/v1/problems/{problemID}`                      | Delete a problem by ID                      |
| GET    | `/api/v1/problems/`                                 | Get all problems                            |
| GET    | `/api/v1/problems/{problemID}`                      | Get a specific problem by ID                |

**Note:** Replace `{problemID}` with the actual problem's ID.

## Getting Started

1. Clone the repository.
2. Create a `.env` file using the example above.
3. Install dependencies:  
    ```bash
    npm install
    ```
4. Start the server:  
    ```bash
    npm start
    ```
