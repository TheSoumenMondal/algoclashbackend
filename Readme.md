# AlgoClash Backend

A comprehensive microservices-based backend system for a competitive programming platform. This system handles problem management, code submission evaluation, and real-time communication between users and the evaluation system.

## 🏗️ Architecture Overview

The backend is built using a **microservices architecture** with the following services:

### 🔧 Core Services

1. **Problem Service** - Manages coding problems and test cases
2. **Submission Service** - Handles code submissions and orchestrates evaluation
3. **Evaluator Service** - Executes and evaluates submitted code using Docker containers
4. **Socket Service** - Provides real-time communication for live updates

### 🛠️ Technology Stack

- **Runtime**: Node.js with TypeScript
- **Web Frameworks**:
  - Express.js (Problem, Evaluator, Socket services)
  - Fastify (Submission service)
- **Database**: MongoDB with Mongoose ODM
- **Message Queue**: BullMQ with Redis
- **Code Execution**: Docker containers (Python, Java, C++)
- **Real-time Communication**: Socket.IO
- **Monitoring**: Bull Board for queue monitoring

## 📋 Services Details

### 1. Problem Service

**Port**: 3001 (default)

Manages the lifecycle of coding problems with full CRUD operations.

**Features**:

- Create, read, update, delete problems
- Markdown description sanitization
- Test case management
- Code stubs for multiple languages
- Difficulty levels (easy, medium, hard)

**API Endpoints**:

- `GET /ping` - Health check
- `POST /api/v1/problems` - Create problem
- `GET /api/v1/problems` - Get all problems
- `GET /api/v1/problems/:id` - Get problem by ID
- `PUT /api/v1/problems/:id` - Update problem
- `DELETE /api/v1/problems/:id` - Delete problem

**Problem Schema**:

```typescript
{
  title: string;
  description: string; // Markdown supported
  testCases: Array<{input: string, output: string}>;
  difficulty: "easy" | "medium" | "hard";
  codeStubs: Array<{
    language: string;
    startingCode: string;
    userCode: string;
    endingCode: string;
  }>;
  editorial?: string;
}
```

### 2. Submission Service

**Port**: 4000 (default)

Orchestrates the code submission process and manages submission records.

**Features**:

- Accept and validate code submissions
- Fetch problem details from Problem Service
- Merge user code with problem templates
- Queue submissions for evaluation
- Track submission status

**API Endpoints**:

- `GET /api/submissions/ping` - Health check
- `POST /api/submissions` - Submit code for evaluation

**Submission Flow**:

1. Receive submission with `userId`, `problemId`, `code`, `language`
2. Fetch problem details from Problem Service
3. Merge user code with starting/ending code templates
4. Store submission in database
5. Queue submission for evaluation via BullMQ

### 3. Evaluator Service

**Port**: 3000 (default)

Executes submitted code in isolated Docker containers and evaluates results.

**Features**:

- Multi-language support (Python, Java, C++)
- Docker-based code execution for security
- Test case validation
- Memory and time limit enforcement
- Queue monitoring via Bull Board

**Supported Languages**:

- **Python 3.9** (`python:3.9-slim`)
- **Java 11** (`openjdk:11.0.11-jdk-slim`)
- **C++** (`gcc:latest`)

**Code Execution Process**:

1. Pull appropriate Docker image
2. Create isolated container with memory limits (512MB)
3. Compile code (for Java/C++)
4. Execute with test case input
5. Compare output with expected result
6. Return execution status and output

**Queue Monitoring**:

- Bull Board UI available at `/admin/queues`
- Real-time queue status and job monitoring
- Job retry and management capabilities

### 4. Socket Service

**Port**: 3001

Provides real-time communication between clients and the backend system.

**Features**:

- WebSocket connections for real-time updates
- User session management with Redis
- Evaluation result broadcasting
- CORS support for web clients

**Socket Events**:

- `addUser` - Register user with socket ID
- `getId` - Retrieve stored socket ID for user
- `getPayload` - Broadcast evaluation results

## 🔄 System Workflow

### Complete Submission Process

1. **Submission Receipt**:

   ```
   Client → Submission Service → MongoDB
   ```

2. **Problem Integration**:

   ```
   Submission Service → Problem Service API
   ```

3. **Queue Processing**:

   ```
   Submission Service → BullMQ → Evaluator Service
   ```

4. **Code Execution**:

   ```
   Evaluator → Docker Container → Result
   ```

5. **Real-time Updates**:
   ```
   Evaluator → Evaluation Queue → Socket Service → Client
   ```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** 6.0+
- **Redis** 6.0+
- **Docker** 20.0+ (for code execution)

### Environment Setup

Create `.env` files for each service:

#### Problem Service

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/algoclash_problems
```

#### Submission Service

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/algoclash_submissions
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PROBLEM_SERVICE_URL=http://localhost:3001
```

#### Evaluator Service

```env
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Socket Service

```env
PORT=3001
```

### Installation & Startup

1. **Install dependencies** for each service:

```bash
cd problem && npm install
cd ../submission && npm install
cd ../evaluator && npm install
cd ../socket && npm install
```

2. **Start infrastructure**:

```bash
# Start MongoDB
mongod

# Start Redis
redis-server
```

3. **Start services** (in separate terminals):

```bash
# Terminal 1 - Problem Service
cd problem && npm run dev

# Terminal 2 - Submission Service
cd submission && npm run dev

# Terminal 3 - Evaluator Service
cd evaluator && npm run dev

# Terminal 4 - Socket Service
cd socket && npm run dev
```

### Service URLs

- **Problem Service**: http://localhost:3001
- **Submission Service**: http://localhost:4000
- **Evaluator Service**: http://localhost:3000
- **Socket Service**: http://localhost:3001
- **Bull Board Monitoring**: http://localhost:3000/admin/queues

## 🧪 Testing

Test the submission flow:

```bash
cd evaluator
node test-submission.js
```

## 📊 Monitoring

### Bull Board Dashboard

Access the queue monitoring dashboard at `http://localhost:3000/admin/queues` to:

- Monitor queue status and job counts
- View individual job details and execution logs
- Retry failed jobs
- Track system performance metrics

### Queue Architecture

- **SubmissionQueue**: Queues code submissions for evaluation
- **EvaluationQueue**: Handles evaluation result broadcasting
- **Redis**: Stores queue state and job data

## 🔒 Security Features

- **Docker Isolation**: Each code execution runs in isolated containers
- **Memory Limits**: 512MB per container to prevent resource abuse
- **Time Limits**: 2-second execution timeout for Java (configurable)
- **Input Sanitization**: Code and input sanitization before execution
- **Markdown Sanitization**: Safe HTML rendering for problem descriptions

## 🏛️ Data Models

### Problem Model

```typescript
interface IProblem {
  title: string;
  description: string;
  testCases: ITestCases[];
  difficulty: "easy" | "medium" | "hard";
  codeStubs: ICodeStubs[];
  editorial?: string;
}
```

### Submission Model

```typescript
interface SubmissionType {
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: "Pending" | "Accepted" | "WA" | "RE" | "TLE" | "MLE";
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Development

### Build Process

Each service uses TypeScript with the following build commands:

```bash
npm run build    # Compile TypeScript
npm run dev      # Development with hot reload
npm start        # Production mode
npm run type-check # Type checking only
```

### Code Structure

```
backend/
├── problem/           # Problem management service
├── submission/        # Submission handling service
├── evaluator/         # Code execution service
└── socket/           # Real-time communication service
```

Each service follows a layered architecture:

- **Controllers** - Request handling
- **Services** - Business logic
- **Repositories** - Data access
- **Models** - Database schemas
- **Routes** - API endpoint definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📜 License

ISC License - see individual package.json files for details.

## 👥 Author

**Soumen Mondal** - Full-stack developer and system architect

---

## 🔗 Related Documentation

- [Bull Board Setup Guide](evaluator/BULL_BOARD_SETUP.md) - Detailed queue monitoring setup
- [Problem Service API](problem/Readme.md) - Problem service specific documentation

For questions or support, please create an issue in the repository.
