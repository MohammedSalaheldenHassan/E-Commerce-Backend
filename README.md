# 🛒 E-Commerce Backend System

A scalable RESTful E-Commerce Backend API built with **Node.js, Express.js, Prisma ORM, and PostgreSQL**.

This project provides a complete backend solution for an online shopping platform with secure authentication, role-based authorization, product management, shopping cart functionality, and order processing.

The project was built to demonstrate real-world backend engineering practices including clean architecture, database modeling, API design, security implementation, and scalable server-side development.

---

# 📌 Project Overview

This backend system powers an e-commerce platform where users can:

- Browse products.
- Manage their shopping cart.
- Place orders.
- Track their purchases.

Administrators can:

- Manage products.
- Manage categories.
- Manage users.
- Manage orders.

The system focuses on:

- Secure authentication.
- Clean API structure.
- Efficient database relationships.
- Maintainable backend architecture.
- Real-world e-commerce workflows.

---

# ✨ Features

## 🔐 Authentication

- User registration.
- User login.
- JWT authentication.
- Protected routes.
- Password hashing.
- Role-based authorization.

---

## 📦 Product Management

- Create products.
- Get all products.
- Get product details.
- Update products.
- Delete products.
- Stock management.
- Category relationship.

---

## 🗂 Category Management

- Create categories.
- Get categories.
- Get category details.
- Update categories.
- Delete categories.

---

## 🛒 Shopping Cart

- Add products to cart.
- View user cart.
- Update product quantity.
- Remove cart items.
- Clear cart.

---

## 📋 Order Management

- Create orders.
- Convert cart items into orders.
- View user orders.
- Manage order status.
- Admin order management.

---

## 👨‍💼 Admin Management

- Manage users.
- Manage products.
- Manage categories.
- Manage orders.

---

# 🎯 Project Goals

The main goals of this project are:

- Build a complete e-commerce backend from scratch.
- Implement secure authentication.
- Create role-based access control.
- Design relational database models.
- Handle complex business logic.
- Build scalable REST APIs.

---

# 🏗 Backend Architecture

The project follows a layered backend architecture:

```
Client
 |
 | HTTP Requests
 ↓
Routes
 |
 ↓
Middleware
 |
 ↓
Controllers
 |
 ↓
Prisma ORM
 |
 ↓
PostgreSQL Database
```

---

# 📁 Project Structure

```
src
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── userController.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── adminController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
│
├── prisma
│   └── schema.prisma
│
└── server.js
```

---

# 🧩 Architecture Layers

## Routes Layer

Responsible for:

- Defining API endpoints.
- Connecting requests with controllers.
- Applying middleware protection.

---

## Middleware Layer

Responsible for:

- JWT verification.
- Authentication checks.
- Authorization checks.
- Protecting private routes.

Authentication flow:

```
Request
 |
JWT Token
 |
Token Verification
 |
Authenticated User
 |
Controller Access
```

---

## Controllers Layer

Contains the main business logic:

Examples:

- Creating products.
- Managing categories.
- Handling cart operations.
- Creating orders.
- Managing users.

---

## Database Layer

Handled using Prisma ORM.

Responsible for:

- Database communication.
- Query management.
- Relations handling.
- Data consistency.

---

# 🛠 Technologies Used

## Backend

- Node.js
- Express.js
- JavaScript (ES Modules)

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JSON Web Token (JWT)
- bcrypt

## Validation & Security

- Zod
- Cookie Parser
- Environment Variables

## Development Tools

- Git
- Postman
- Nodemon
- Prisma CLI

---

# 🔐 Authentication System

The project uses JWT-based authentication.

## Authentication Flow

1. User creates an account.
2. Password is hashed securely.
3. User logs in.
4. Server generates JWT token.
5. Client sends the token with protected requests.
6. Middleware validates the token.
7. User identity becomes available inside controllers.

Example:

```
Authorization: Bearer TOKEN
```

After successful verification:

```javascript
req.user = authenticatedUser;
```

The authenticated user can now access protected resources depending on permissions.

---

# 👥 User Roles

The system supports two roles:

## 👤 User

Users can:

- Browse products.
- Manage their cart.
- Create orders.
- View personal orders.

---

## 👨‍💼 Admin

Admins can:

- Manage users.
- Manage products.
- Manage categories.
- Manage orders.

---

# 🗄 Database Design

The database is designed using PostgreSQL and Prisma ORM.

## Entity Relationships

```
User
 |
 |
Cart
 |
 |
CartItems
 |
 |
Product
 |
 |
Category


User
 |
 |
Orders
 |
 |
OrderItems
 |
 |
Product
```

---

# 📦 Database Models

## User

Stores user account information.

Responsibilities:

- Authentication.
- User identity.
- Role management.

---

## Product

Represents store products.

Contains:

- Product name.
- Description.
- Price.
- Stock quantity.
- Category relation.

---

## Category

Organizes products into groups.

Example:

```
Electronics
Fashion
Books
```

---

## Cart System

The cart system is divided into:

### Cart

Represents the user's shopping basket.

Each user owns one cart.

### CartItems

Represents products inside the cart.

Example:

```
Cart

 ├── Laptop x1
 ├── Phone x2
 └── Keyboard x1
```

---

## Order System

Orders are created from cart data during checkout.

Flow:

```
Cart
 |
Checkout
 |
Create Order
 |
Create OrderItems
 |
Clear Cart
```

---

# 🔒 Security Features

Implemented security practices:

- JWT authentication.
- Password hashing.
- Protected routes.
- Role-based authorization.
- Database constraints.
- Input validation.
- Secure user access control.

---

# ⚙️ Installation

Clone the repository:

```bash
git clone repository-url
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_secret_key"

PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

---

# 🧪 API Testing

The API can be tested using:

- Postman.
- Insomnia.

---

# 📈 Future Improvements

Possible improvements:

- Payment gateway integration.
- Product reviews.
- Wishlist system.
- Coupons and discounts.
- Email notifications.
- Advanced search.
- Pagination.
- Cloud image storage.
- Automated testing.

---

# 👨‍💻 Developer

**Mohammed Salahelden Hassen Mahdi**

Backend Developer

