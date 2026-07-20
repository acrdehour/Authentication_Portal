# Example Identity Authentication

A simple full-stack authentication system developed as a technical assessment.

## Screenshots

### Login

![Login](docs/login.png)

### Register

![Register](docs/register.png)

### Home

![Home](docs/home.png)

## Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt.Net Password Hashing
- Swagger

### Frontend
- Angular
- TypeScript
- HttpClient

---

## Features

- User Registration
- User Login
- Password hashing using BCrypt
- JWT Authentication
- Protected API endpoint (`GET /api/auth/me`)
- Display authenticated username after login

---

## Project Structure

```
Authentication_Portal
│
├── Authentication.Portal.Identity.Api
│   ├── Controllers
│   ├── Services
│   ├── Repositories
│   ├── Data
│   └── ...
│
└── authentication-portal-identity-web
    ├── src
    ├── pages
    ├── services
    └── ...
```

---

## How to Run

### Backend

1. Open `Authentication.Portal.Identity.Api`
2. Update the SQL Server connection string in `appsettings.json`
3. Apply migrations

```bash
dotnet ef database update
```

4. Run the API

```bash
dotnet run
```

Swagger

```
https://localhost:7011/swagger
```

---

### Frontend

```bash
npm install
ng serve
```

Angular

```
http://localhost:4200
```

---

## Authentication Flow

```
Register
    ↓
Password hashed using BCrypt
    ↓
Stored in SQL Server
    ↓
Login
    ↓
JWT Token generated
    ↓
Angular stores token in Local Storage
    ↓
Call protected API (/api/auth/me)
    ↓
Display authenticated username
```

---

## Notes

This project was implemented with a focus on clean separation between backend and frontend while keeping the implementation simple and easy to review.
