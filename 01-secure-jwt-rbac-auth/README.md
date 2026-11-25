# 01 — Secure JWT & Role-Based Access Control (RBAC) Auth API

A production-structured authentication and authorization service built with Node.js, Express, and MongoDB. Implements short-lived JWT access tokens, HTTP-only rotating refresh tokens, token reuse detection, instant multi-device session revocation, rate limiting, and role-based route protection.

## Key Security Features

- **Dual-Token Architecture:** Short-lived JWT Access Tokens (`Authorization: Bearer <token>`) paired with long-lived Refresh Tokens stored in `httpOnly`, `sameSite: "strict"` cookies.
- **Refresh Token Rotation & Hashing:** Every `/refresh` call issues a new refresh token pair and stores only the deterministic **SHA-256 hash** (`crypto`) in MongoDB—never raw tokens.
- **Token Reuse Detection:** If an already-rotated (stolen) refresh token is presented, all active sessions for that user are immediately invalidated (`refreshTokenHash = null`, `tokenVersion += 1`).
- **Instant Session Revocation (`tokenVersion`):** Incrementing `tokenVersion` on login, logout, or security alerts immediately invalidates existing stateless access tokens before expiry.
- **Password Security:** Salted hashing with `bcryptjs` (`select: false` on `passwordHash` and `refreshTokenHash` in Mongoose schema).
- **Brute-Force Protection:** Express rate limiting (`authLimiter`) on authentication endpoints (`/register`, `/login`, `/refresh`).
- **Role-Based Access Control (RBAC):** Middleware-enforced role verification (`verifyAuth` + `isAdmin`) for restricted endpoints.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Security & Auth:** `jsonwebtoken`, `bcryptjs`, Node `crypto`, `cookie-parser`, `express-rate-limit`

## Project Structure

```text
01-secure-jwt-rbac-auth/
├── src/
│   ├── app/
│   │   └── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.routes.js
│   └── utils/
│       └── tokenUtils.js
├── .env.example
├── package.json
├── README.md
└── server.js
```

## API endpoints

Header for protected routes (`/me`, `/logout`, `/admin-dashboard`): `Authorization: Bearer <accessToken>`

### Authentication

| Method | Path | What it does |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user, issue access token, and set `HttpOnly` refresh cookie |
| POST | `/api/auth/login` | Authenticate user, rotate `tokenVersion`, and issue new token pair |
| POST | `/api/auth/refresh` | Validate `refreshToken` cookie, detect token reuse, and rotate tokens |
| POST | `/api/auth/logout` | Revoke active session (`tokenVersion += 1`) and clear refresh cookie |

### User & RBAC

| Method | Path | What it does |
| :--- | :--- | :--- |
| GET | `/api/auth/me` | Fetch authenticated user's profile details |
| GET | `/api/auth/admin-dashboard` | Access restricted admin-only resource (`role: "admin"` required) |

## Environment Variables

Create a `.env` file in the root of `01-secure-jwt-rbac-auth`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

```

## Setup & Run

```bash
npm install
npm run dev
```