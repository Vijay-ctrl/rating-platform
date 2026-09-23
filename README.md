# Rating Platform

A full-stack role-based store rating platform built as a Full-Stack Intern Coding Challenge.

The application provides a single authentication system with role-based access for **System Administrators, Normal Users, and Store Owners**. Users can browse stores and submit ratings, administrators can manage users and stores, and store owners can monitor their store ratings.

## 🚀 Project Status

**Development:** Complete
**Deployment:** In Progress

* Frontend: React + Vite
* Backend: Node.js + Express.js
* Database: PostgreSQL
* ORM: Prisma
* Authentication: JWT
* Validation: Zod

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control
* Protected routes
* Password update functionality
* Secure password hashing using bcrypt
* Backend validation using Zod

### 👑 System Administrator

Administrators can:

* View dashboard statistics
* Add normal users
* Add administrators
* Add store owners
* Add stores
* View and search users
* Filter users by name, email, address, and role
* Sort users
* View individual user details
* View store owner ratings
* View and search stores
* Sort stores
* Logout

### 👤 Normal User

Normal users can:

* Create an account
* Login
* View all stores
* Search stores by name
* Search stores by address
* View overall store ratings
* View their submitted rating
* Submit a rating from 1–5
* Modify an existing rating
* Update their password
* Logout

### 🏪 Store Owner

Store owners can:

* Login
* View their store
* View average rating
* View total number of ratings
* View users who submitted ratings
* Update their password
* Logout

---

## 🧰 Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* Zod

### Database

* PostgreSQL
* Prisma ORM
* Prisma PostgreSQL Adapter

### Planned Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Neon PostgreSQL

---

## 🏗️ Architecture

```text
┌──────────────────────┐
│      React + Vite    │
│       Frontend       │
└──────────┬───────────┘
           │
           │ Axios / REST API
           ▼
┌──────────────────────┐
│      Express.js      │
│        Backend       │
├──────────────────────┤
│ Routes               │
│ Controllers          │
│ Services             │
│ Middleware           │
│ Validators           │
└──────────┬───────────┘
           │
           │ Prisma ORM
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│       Database       │
└──────────────────────┘
```

---

## 🗄️ Database Design

The application uses three main models.

### User

```text
User
├── id
├── name
├── email
├── passwordHash
├── address
├── role
├── createdAt
└── updatedAt
```

Supported roles:

```text
ADMIN
USER
STORE_OWNER
```

### Store

```text
Store
├── id
├── name
├── email
├── address
├── ownerId
├── createdAt
└── updatedAt
```

Each store has one store owner.

### Rating

```text
Rating
├── id
├── rating
├── userId
├── storeId
├── createdAt
└── updatedAt
```

A user can submit only one rating for a particular store.

The database enforces this through:

```text
@@unique([userId, storeId])
```

---

## 🔒 Validation

The application implements the challenge validation requirements on the backend.

| Field    | Requirement                      |
| -------- | -------------------------------- |
| Name     | 20–60 characters                 |
| Address  | Maximum 400 characters           |
| Password | 8–16 characters                  |
| Password | At least one uppercase character |
| Password | At least one special character   |
| Email    | Valid email format               |
| Rating   | Integer from 1–5                 |

Validation is implemented using **Zod** and is enforced independently of frontend validation.

---

## 🔑 Authentication Flow

```text
User
 │
 │ Login
 ▼
Express API
 │
 │ Validate credentials
 ▼
bcrypt password verification
 │
 ▼
JWT generated
 │
 ▼
Frontend stores token
 │
 ▼
Protected API request
 │
 ▼
JWT middleware
 │
 ▼
Role middleware
 │
 ▼
Authorized resource
```

Role authorization is enforced on the backend.

---

## 🔌 API Endpoints

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PATCH  /api/auth/password
```

### Administrator

```text
GET    /api/admin/dashboard

GET    /api/admin/users
GET    /api/admin/users/:id

POST   /api/admin/users
POST   /api/admin/admins
POST   /api/admin/store-owners

GET    /api/admin/stores
POST   /api/admin/stores
```

### Normal User

```text
GET    /api/user/stores
```

### Ratings

```text
POST   /api/ratings
```

The rating endpoint supports both submitting a new rating and modifying an existing rating.

### Store Owner

```text
GET    /api/owner/dashboard
```

---

## 📁 Project Structure

```text
rating-platform/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       │   ├── admin/
│       │   ├── auth/
│       │   ├── owner/
│       │   └── user/
│       ├── routes/
│       ├── services/
│       └── utils/
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── generated/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── validators/
│
├── .gitignore
└── README.md
```

---

## 🧪 Testing

The application has been tested across:

* Registration
* Login
* JWT authentication
* Role-based authorization
* Admin dashboard
* User management
* Store management
* Store owner dashboard
* Rating submission
* Rating modification
* Search
* Filtering
* Sorting
* Password updates
* Frontend validation
* Backend validation
* Boundary-value validation
* Responsive layouts

Boundary cases tested include:

```text
Name:       20 / 60 characters
Address:    400 characters
Password:   8 / 16 characters
Rating:     1 / 5
```

The frontend production build also completes successfully using Vite.

---

## 🛡️ Security

* Passwords are hashed using bcrypt
* JWT protects authenticated API routes
* Role-based middleware restricts access
* Backend validation prevents invalid requests
* Database constraints prevent duplicate ratings
* Environment variables are excluded from Git
* Database credentials are never committed

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Vijay-ctrl/rating-platform.git
cd rating-platform
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create:

```text
server/.env
```

Add:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secure_jwt_secret"
PORT=5000
```

Do not commit `.env`.

### 5. Start the backend

```bash
cd server
npm start
```

Backend:

```text
http://localhost:5000
```

### 6. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌐 Deployment Architecture

The planned production architecture is:

```text
┌─────────────────┐
│     Vercel      │
│ React Frontend  │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────┐
│     Render      │
│ Express Backend │
└────────┬────────┘
         │
         │ Prisma
         ▼
┌─────────────────┐
│      Neon       │
│    PostgreSQL   │
└─────────────────┘
```

---

## 📸 Screenshots

Screenshots will be added after the production UI is finalized.

Planned screenshots:

* Login
* Registration
* Admin Dashboard
* Admin Users
* Admin Stores
* Normal User Store Listing
* Rating Modal
* Store Owner Dashboard

---

## 👨‍💻 Author

**Vijay Dange**

Computer Engineering Student | Full-Stack Developer

GitHub:
https://github.com/Vijay-ctrl

LinkedIn:
https://linkedin.com/in/vijay-dange-40772927/

---

## 📄 Coding Challenge

This project was developed as a solution to a Full-Stack Intern Coding Challenge requiring:

* ReactJS frontend
* ExpressJS backend
* PostgreSQL database
* Role-based functionality
* Authentication
* Store management
* User management
* Rating submission and modification
* Search and sorting
* Input validation
* Database design best practices
