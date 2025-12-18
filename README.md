# 🚀 Node.js Express API - Learning Project

A professional REST API built with Express.js featuring JWT authentication, protected routes, and layered architecture.

## 📋 Table of Contents
- [Features](#features)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Learning Resources](#learning-resources)

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Token expiration (1 hour)

### 📝 TODO Management (Protected)
- Create, read, update, delete todos
- Filter by status (pending, in-progress, completed)
- Search in title and description
- Toggle todo status
- User isolation (users only see their own todos)

### ✅ Validation
- Zod schema validation
- Detailed error messages
- Input sanitization

### 🏗️ Professional Architecture
- Layered architecture (Repository → Service → Controller → Routes)
- Separation of concerns
- Consistent patterns across modules
- Global error handling

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:3000`

### 3. Test the API

#### Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Copy the token from the response!**

#### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Learn Node.js",
    "description": "Build a REST API",
    "status": "in-progress"
  }'
```

#### Get All Todos
```bash
curl http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📚 API Documentation

### Users API
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login and get JWT token | No |
| GET | `/api/users` | Get all users | No |
| GET | `/api/users/:id` | Get user by ID | No |
| PUT | `/api/users/:id` | Update user | No |
| PATCH | `/api/users/:id` | Partial update user | No |
| DELETE | `/api/users/:id` | Delete user | No |

### Todos API (All Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all user's todos | ✅ Yes |
| GET | `/api/todos/:id` | Get single todo | ✅ Yes |
| POST | `/api/todos` | Create new todo | ✅ Yes |
| PUT | `/api/todos/:id` | Update todo (full) | ✅ Yes |
| PATCH | `/api/todos/:id` | Update todo (partial) | ✅ Yes |
| PATCH | `/api/todos/:id/toggle` | Toggle todo status | ✅ Yes |
| DELETE | `/api/todos/:id` | Delete todo | ✅ Yes |

**📖 Detailed API Documentation:** See [TODO_API.md](./TODO_API.md)

---

## 🏗️ Architecture

### Folder Structure
```
src/
├── users/              # User module
│   ├── repository.js   # Data access
│   ├── user.service.js # Business logic
│   ├── controller.js   # HTTP handlers
│   ├── routes.js       # Route definitions
│   ├── schema.js       # Validation schemas
│   └── middleware.js   # Auth & validation
│
├── todo/               # Todo module (protected)
│   ├── repository.js   # Data access
│   ├── todo.service.js # Business logic + ownership
│   ├── controller.js   # HTTP handlers
│   ├── routes.js       # Protected routes
│   └── schema.js       # Validation schemas
│
├── storage/            # JSON "database"
│   ├── users.json
│   └── todos.json
│
└── server.js           # App entry point
```

### Request Flow
```
Client Request
    ↓
Authentication Middleware (verify JWT)
    ↓
Validation Middleware (check with Zod)
    ↓
Controller (handle HTTP)
    ↓
Service (business logic + ownership)
    ↓
Repository (data access)
    ↓
JSON File Storage
```

**📖 Detailed Architecture Guide:** See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🎓 Learning Resources

### Documentation Files

1. **[TODO_API.md](./TODO_API.md)** - Complete API documentation with examples
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep dive into architecture patterns
3. **[SUMMARY.md](./SUMMARY.md)** - Implementation summary and learning points
4. **[test-todo-api.http](./test-todo-api.http)** - Ready-to-use API tests

### Key Concepts Covered

✅ **Express.js**
- Routing and middleware
- Request/response handling
- Error handling

✅ **Authentication & Authorization**
- JWT tokens
- Protected routes
- User ownership validation

✅ **Validation**
- Zod schemas
- Input validation
- Error messages

✅ **Architecture Patterns**
- Layered architecture
- Repository pattern
- Service layer pattern
- Separation of concerns

✅ **Async JavaScript**
- async/await
- Promise handling
- Non-blocking I/O

---

## 🧪 Testing

### Using REST Client (VS Code Extension)
1. Install "REST Client" extension
2. Open `test-todo-api.http`
3. Click "Send Request" above each request

### Using Postman
1. Import the requests from `test-todo-api.http`
2. Set up environment variable for token
3. Test all endpoints

### Using cURL
See examples in [Quick Start](#quick-start) section

---

## 🔐 Security Features

- **JWT Authentication**: Stateless token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **User Isolation**: Users only access their own data
- **Ownership Validation**: Service layer checks permissions
- **Input Validation**: All inputs validated with Zod
- **Error Handling**: No sensitive data in error messages

---

## 📦 Dependencies

```json
{
  "express": "^4.22.1",        // Web framework
  "jsonwebtoken": "^9.0.3",    // JWT authentication
  "bcryptjs": "^3.0.3",        // Password hashing
  "zod": "^4.1.12",            // Validation
  "http-error-classes": "^1.0.1", // Error classes
  "dotenv": "^17.2.3"          // Environment variables
}
```

---

## 🎯 For Performance Review

### What This Project Demonstrates

✅ **RESTful API Design**
- Proper HTTP methods and status codes
- Resource-based URLs
- Consistent response format

✅ **Authentication & Authorization**
- JWT implementation
- Protected routes
- User ownership checks

✅ **Code Organization**
- Layered architecture
- Separation of concerns
- Reusable patterns

✅ **Error Handling**
- Validation errors
- Business logic errors
- Global error handler

✅ **Best Practices**
- Async/await for non-blocking I/O
- Input validation
- Security considerations

### Questions You Can Answer

1. How does JWT authentication work?
2. What's the difference between authentication and authorization?
3. Why use a layered architecture?
4. How do you handle errors in Express?
5. What's the purpose of middleware?
6. Why validate user input?
7. How do you ensure data isolation between users?

---

## 🚀 Next Steps

### Improvements You Can Make

1. **Add Database**
   - Replace JSON files with MongoDB or PostgreSQL
   - Only need to change repository layer!

2. **Add More Features**
   - Todo due dates
   - Todo categories/tags
   - Todo sharing
   - File attachments

3. **Improve Security**
   - Refresh tokens
   - Rate limiting
   - CORS configuration
   - Input sanitization

4. **Add Testing**
   - Unit tests (Jest)
   - Integration tests
   - API tests (Supertest)

5. **Add Logging**
   - Request logging
   - Error logging
   - Performance monitoring

---

## 📝 License

ISC

---

## 🙏 Acknowledgments

Built as a learning project to understand:
- Node.js and Express.js
- REST API design
- Authentication and authorization
- Professional code architecture

---

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the code comments
3. Test with the provided examples

---

**Happy Learning! 🎉**

Remember: The best way to learn is by doing. Try modifying the code, adding features, and breaking things (in development)!

