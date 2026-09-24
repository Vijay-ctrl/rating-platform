# ⭐ Rating Platform

A full-stack role-based store rating platform built as a **Full-Stack Intern Coding Challenge**.

The application provides a complete role-based ecosystem for **System Administrators, Normal Users, and Store Owners**. Users can browse stores and submit ratings, administrators can manage users and stores, and store owners can monitor ratings and customer activity for their stores.

The project is built with **React, Node.js, Express.js, PostgreSQL, Prisma, JWT, bcrypt, and Zod**, and is deployed using **Render**.

---

## 🚀 Project Status

| Component | Status |
|---|---|
| Frontend | ✅ Complete |
| Backend | ✅ Complete |
| Database | ✅ Complete |
| Authentication | ✅ Complete |
| Role-Based Authorization | ✅ Complete |
| Rating System | ✅ Complete |
| Admin Management | ✅ Complete |
| Store Owner Dashboard | ✅ Complete |
| Responsive UI | ✅ Complete |
| Testing | ✅ Complete |
| Deployment | ✅ Live |

### 🌐 Live Application

**Frontend / Web Application**

https://rating-platform-1-70ga.onrender.com

**Backend API**

https://rating-platform-05rv.onrender.com

**GitHub Repository**

https://github.com/Vijay-ctrl/rating-platform

---

# ✨ Features

## 🔐 Authentication & Authorization

- User registration and login
- Role-based login
- JWT-based authentication
- Protected routes
- Backend role-based authorization
- Password update functionality
- Secure password hashing using bcrypt
- Backend validation using Zod
- Separate dashboards for each role

### Supported Roles

```text
ADMIN
USER
STORE_OWNER


👑 System Administrator

Administrators have complete management access to the platform.

Dashboard

Administrators can:

View platform statistics
View total users
View total stores
View total ratings
Monitor platform activity
User Management

Administrators can:

Add normal users
Add administrators
Add store owners
View all users
Search users
Filter users by:
Name
Email
Address
Role
Sort users
View individual user details
View user roles
View account information
Store Management

Administrators can:

View all stores
Search stores
Sort stores
Add new stores
Assign a store owner to a store
View store information
View store owner information
View store ratings
Administration
Secure admin dashboard
Role-protected admin routes
Logout functionality
Account management
Password update functionality
👤 Normal User

Normal users can interact with stores and submit ratings.

Account

Users can:

Create an account
Login
Logout
View their account
Update their password
Store Discovery

Users can:

View all available stores
Search stores by name
Search stores by address
View store information
View overall store ratings
Rating System

Users can:

Submit a rating from 1 to 5
View their submitted rating
Modify an existing rating
Submit only one rating per store

The database prevents duplicate user-store ratings through a unique constraint.

🏪 Store Owner

Store owners have access to their store-specific dashboard.

Store Dashboard

Store owners can:

Login
View their assigned store
View store name
View store address
View average rating
View total number of ratings
View number of customers who rated the store
Customer Activity

Store owners can:

View users who submitted ratings
Monitor customer rating activity
View rating-related statistics
Account Security

Store owners can:

Update their password
Logout

Store owners cannot access administrator or normal-user protected resources.

🧰 Tech Stack
Frontend
React
Vite
React Router DOM
Axios
CSS
JavaScript
Backend
Node.js
Express.js
JWT
bcryptjs
Zod
REST API
Database
PostgreSQL
Prisma ORM
Prisma PostgreSQL Adapter
Deployment
Render Static Site — Frontend
Render Web Service — Backend
PostgreSQL — Database
🏗️ System Architecture
                         ┌─────────────────────────┐
                         │        End User         │
                         │                         │
                         │ Admin / User / Owner    │
                         └────────────┬────────────┘
                                      │
                                      │ HTTPS
                                      ▼
                         ┌─────────────────────────┐
                         │        Render           │
                         │     Static Website      │
                         │                         │
                         │     React + Vite        │
                         └────────────┬────────────┘
                                      │
                                      │ Axios / REST API
                                      ▼
                         ┌─────────────────────────┐
                         │        Render           │
                         │      Web Service        │
                         │                         │
                         │    Express.js API       │
                         ├─────────────────────────┤
                         │ Routes                  │
                         │ Controllers             │
                         │ Services                │
                         │ Middleware              │
                         │ Validators              │
                         │ JWT Authentication      │
                         └────────────┬────────────┘
                                      │
                                      │ Prisma ORM
                                      ▼
                         ┌─────────────────────────┐
                         │      PostgreSQL         │
                         │                         │
                         │ Users                   │
                         │ Stores                  │
                         │ Ratings                 │
                         └─────────────────────────┘
🔄 Application Flow
                    ┌───────────────┐
                    │     Login     │
                    └───────┬───────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Express API       │
                  │ Validate Request  │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ bcrypt Password   │
                  │ Verification      │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Generate JWT      │
                  │ userId + role     │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ React Frontend    │
                  │ Stores Token      │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Protected Request │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ JWT Middleware    │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Role Middleware   │
                  └─────────┬─────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          ADMIN           USER        STORE_OWNER
             │              │              │
             ▼              ▼              ▼
        Admin Panel     User Panel     Owner Panel

Role authorization is enforced on the backend rather than relying only on frontend navigation.

🗄️ Database Design

The application uses three primary models:

User
Store
Rating
User
User
├── id
├── name
├── email
├── passwordHash
├── address
├── role
├── createdAt
└── updatedAt

Supported roles:

ADMIN
USER
STORE_OWNER
Store
Store
├── id
├── name
├── email
├── address
├── ownerId
├── createdAt
└── updatedAt

Each store is associated with one store owner.

Rating
Rating
├── id
├── rating
├── userId
├── storeId
├── createdAt
└── updatedAt

A user can submit only one rating for a particular store.

The database enforces this relationship using:

@@unique([userId, storeId])

This allows a user to update an existing rating instead of creating duplicate ratings for the same store.

🔒 Validation

The application implements validation requirements on the backend using Zod.

Field	Requirement
Name	20–60 characters
Address	Maximum 400 characters
Password	8–16 characters
Password	At least one uppercase character
Password	At least one special character
Email	Valid email format
Rating	Integer from 1–5
Role	ADMIN / USER / STORE_OWNER

Backend validation is independent of frontend validation, ensuring that invalid requests cannot bypass validation by directly calling the API.

🔑 Authentication Flow
User
 │
 │ Login
 ▼
Express API
 │
 │ Validate email/password/role
 ▼
bcrypt password verification
 │
 ▼
JWT generated
 │
 │ userId + role
 ▼
Frontend
 │
 │ Token
 ▼
Protected API Request
 │
 ▼
JWT Authentication Middleware
 │
 ▼
Role Authorization Middleware
 │
 ▼
Authorized Controller
 │
 ▼
Service Layer
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL
🔐 Security

The application implements several security measures:

Passwords are never stored as plain text
Passwords are hashed using bcrypt
JWT is used for authentication
Protected API routes require authentication
Role-based middleware restricts resources
Backend validation using Zod
Database constraints prevent duplicate ratings
Environment variables are excluded from Git
Database credentials are never committed
Users cannot access resources belonging to unauthorized roles
🔌 API Endpoints
Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PATCH  /api/auth/password
Administrator
GET    /api/admin/dashboard

GET    /api/admin/users
GET    /api/admin/users/:id

POST   /api/admin/users
POST   /api/admin/admins
POST   /api/admin/store-owners

GET    /api/admin/stores
POST   /api/admin/stores
Normal User
GET    /api/user/stores
Ratings
POST   /api/ratings

The rating endpoint supports:

Creating a new rating
Updating an existing rating
Store Owner
GET    /api/owner/dashboard
📁 Project Structure
rating-platform/
│
├── client/
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       │   ├── admin/
│       │   ├── auth/
│       │   ├── owner/
│       │   └── user/
│       │
│       ├── routes/
│       ├── services/
│       └── utils/
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
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
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md
🧪 Testing

The application has been tested across the major application workflows.

Authentication
Registration
Login
JWT authentication
Role-based login
Invalid credentials
Invalid role selection
Protected routes
Logout
Administrator
Admin dashboard
User creation
Admin creation
Store owner creation
Store creation
User search
User filtering
User sorting
Store search
Store sorting
Store owner assignment
Normal User
Store listing
Store search
Rating submission
Rating modification
Rating validation
Customer activity generation
Store Owner
Owner login
Owner dashboard
Store information
Average rating
Total ratings
Customer activity
Password update
Security & Validation
Frontend validation
Backend validation
JWT authorization
Role authorization
Password hashing
Duplicate rating prevention
Responsive Testing

The interface was tested across different screen sizes including:

Desktop
Laptop
Tablet
Mobile
🧪 Boundary-Value Testing

The following boundary cases were tested:

Name
20 characters → Valid
60 characters → Valid

Address
400 characters → Valid

Password
8 characters → Valid
16 characters → Valid

Rating
1 → Valid
5 → Valid

Invalid values outside the defined constraints are rejected by backend validation.

⭐ Rating Flow

The complete rating workflow is:

Normal User
     │
     ▼
Login
     │
     ▼
View Stores
     │
     ▼
Search Store
     │
     ▼
Select Store
     │
     ▼
Submit Rating 1–5
     │
     ▼
Rating Stored
     │
     ▼
Rating Aggregated
     │
     ├───────────────┐
     ▼               ▼
User Dashboard   Owner Dashboard
                     │
                     ▼
              Average Rating
                     │
                     ▼
              Customer Activity

A user can later modify their existing rating.

🏪 Store Owner Flow
ADMIN
 │
 ▼
Create Store Owner
 │
 ▼
STORE_OWNER Account
 │
 ▼
Create Store
 │
 ▼
Assign Store Owner
 │
 ▼
Store Owner Login
 │
 ▼
/owner
 │
 ▼
Owner Dashboard
 │
 ├── Store Information
 ├── Average Rating
 ├── Total Ratings
 └── Customer Activity
👑 Administrator Flow
ADMIN LOGIN
     │
     ▼
ADMIN DASHBOARD
     │
     ├───────────────┐
     │               │
     ▼               ▼
  USERS            STORES
     │               │
     ├── Search      ├── Search
     ├── Filter      ├── Sort
     ├── Sort        └── Create Store
     │
     ├── Create User
     ├── Create Admin
     └── Create Store Owner
👤 User Flow
REGISTER
   │
   ▼
LOGIN
   │
   ▼
USER DASHBOARD
   │
   ▼
VIEW STORES
   │
   ├── Search by Name
   ├── Search by Address
   │
   ▼
SELECT STORE
   │
   ▼
SUBMIT RATING
   │
   ▼
RATING SAVED
   │
   ▼
MODIFY RATING
🌐 Deployment

The application is deployed using Render.

Frontend

The React + Vite application is deployed as a Render Static Site.

Render Static Site
        │
        ▼
React + Vite Frontend

Live URL:

https://rating-platform-1-70ga.onrender.com

Backend

The Express.js application is deployed as a Render Web Service.

Render Web Service
        │
        ▼
Node.js + Express API

Backend URL:

https://rating-platform-05rv.onrender.com

The frontend communicates with the backend using Axios and the deployed API base URL.

Database

The backend communicates with PostgreSQL through Prisma ORM.

React
  │
  │ HTTPS
  ▼
Render Frontend
  │
  │ REST API
  ▼
Render Backend
  │
  │ Prisma
  ▼
PostgreSQL
⚙️ Local Setup
1. Clone the Repository
git clone https://github.com/Vijay-ctrl/rating-platform.git

cd rating-platform
2. Install Frontend Dependencies
cd client

npm install
3. Install Backend Dependencies

Open another terminal:

cd server

npm install
4. Configure Environment Variables

Create:

server/.env

Add:

DATABASE_URL="your_postgresql_connection_string"

JWT_SECRET="your_secure_jwt_secret"

PORT=5000

Do not commit .env to Git.

5. Run Database Setup

From the server directory:

npx prisma generate

Run migrations if required:

npx prisma migrate dev
6. Start Backend
cd server

npm start

Backend:

http://localhost:5000
7. Start Frontend

Open another terminal:

cd client

npm run dev

Frontend:

http://localhost:5173
🖥️ Screenshots

Screenshots are maintained inside the project's docs/screenshots/ directory.

Recommended structure:

docs/
└── screenshots/
    ├── login.png
    ├── register.png
    ├── admin-dashboard.png
    ├── admin-users.png
    ├── admin-user-details.png
    ├── admin-stores.png
    ├── add-store.png
    ├── user-dashboard.png
    ├── rating.png
    ├── owner-dashboard.png
    └── change-password.png
🔐 Login

The login page supports role-based authentication for:

User
Admin
Store Owner
📝 Registration

Users can create accounts by providing:

Account type
Full name
Email
Address
Password
👑 Admin Dashboard

The administrator dashboard provides an overview of platform activity and management options.

👥 Admin User Management

Administrators can search, filter, sort, and manage users.

👤 User Details

Administrators can inspect individual user information and account details.

🏪 Admin Store Management

Administrators can view and manage stores and their assigned owners.

➕ Create Store

Administrators can create a store and assign a unique store owner.

⭐ User Rating

Normal users can submit and modify ratings between 1 and 5.

🏪 Store Owner Dashboard

Store owners can monitor:

Store information
Average rating
Total ratings
Customers who rated the store
🔑 Change Password

Authenticated users can securely update their password.

📊 Project Highlights

This project demonstrates practical implementation of:

Full-stack application development
REST API design
Role-based access control
JWT authentication
Secure password hashing
Backend validation
Database modeling
Prisma ORM
PostgreSQL relationships
Unique database constraints
CRUD operations
Search functionality
Filtering
Sorting
Rating aggregation
Responsive UI
Production deployment
Frontend/backend separation
Environment-based configuration
🎯 Coding Challenge Requirements

This project was developed as a solution to a Full-Stack Intern Coding Challenge involving:

ReactJS frontend
ExpressJS backend
PostgreSQL database
Role-based functionality
Authentication
Authorization
Store management
User management
Store owner management
Rating submission
Rating modification
Search
Filtering
Sorting
Input validation
Password security
Database relationships
Database constraints
Responsive interface
🔗 Project Links
Resource	Link
🌐 Live Frontend	https://rating-platform-1-70ga.onrender.com
⚙️ Backend API	https://rating-platform-05rv.onrender.com
💻 GitHub Repository	https://github.com/Vijay-ctrl/rating-platform
👨‍💻 GitHub Profile	https://github.com/Vijay-ctrl
💼 LinkedIn	https://linkedin.com/in/vijay-dange-40772927/
👨‍💻 Author
Vijay Dange

Computer Engineering Student | Full-Stack Developer

Interested in:

Full-Stack Development
MERN Stack
Backend Engineering
System Design
AI/ML
Cloud & Deployment
GitHub

https://github.com/Vijay-ctrl

LinkedIn

https://linkedin.com/in/vijay-dange-40772927/

📄 License

This project was created as part of a Full-Stack Intern Coding Challenge and is intended for educational, portfolio, and evaluation purposes.

⭐ Final Project Flow
                    RATING PLATFORM
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
        ADMIN            USER         STORE OWNER
          │                │                │
          ▼                ▼                ▼
   Manage Platform    Browse Stores    View Store
          │                │                │
          ├── Users        │                │
          ├── Admins       │                │
          ├── Owners       ▼                │
          └── Stores    Submit Rating       │
                           │                │
                           ▼                │
                    Rating Aggregation      │
                           │                │
                           └────────┬───────┘
                                    ▼
                            Owner Dashboard
                                    │
                                    ▼
                           Customer Activity
🚀 Deployment Architecture
                     INTERNET
                         │
                         ▼
        ┌─────────────────────────────┐
        │       Render Static Site    │
        │                             │
        │      React + Vite App       │
        │                             │
        │ rating-platform-1-70ga      │
        └──────────────┬──────────────┘
                       │
                       │ HTTPS / Axios
                       ▼
        ┌─────────────────────────────┐
        │       Render Web Service    │
        │                             │
        │    Node.js + Express.js     │
        │                             │
        │ rating-platform-05rv        │
        └──────────────┬──────────────┘
                       │
                       │ Prisma ORM
                       ▼
        ┌─────────────────────────────┐
        │         PostgreSQL          │
        │                             │
        │ Users / Stores / Ratings    │
        └─────────────────────────────┘
✅ Project Completion

The Rating Platform has completed the core development, testing, and deployment workflow.

The complete system now supports:

Authentication
      ↓
Role-Based Authorization
      ↓
Admin Management
      ↓
User Management
      ↓
Store Owner Management
      ↓
Store Management
      ↓
Store Discovery
      ↓
Rating Submission
      ↓
Rating Modification
      ↓
Rating Aggregation
      ↓
Customer Activity
      ↓
Store Owner Dashboard
      ↓
Password Management
      ↓
Production Deployment

Live Application:
https://rating-platform-1-70ga.onrender.com

Backend API:
https://rating-platform-05rv.onrender.com

Repository:
https://github.com/Vijay-ctrl/rating-platform