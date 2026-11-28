# 🚀 MERN Stack Machine Coding & Backend Architecture Practicals

A structured collection of production-grade, security-hardened backend and full-stack machine coding implementations built using **Node.js, Express.js, MongoDB, and React.js**.

Each practical follows a clean **Industrial MVC + Middleware** architecture with real-world edge-case handling, input validation, and security best practices.

---

## 🛠️ Core Tech Stack & Security Tools
- **Runtime & Framework:** Node.js, Express.js (ES Modules)
- **Database & ODM:** MongoDB, Mongoose
- **Authentication & Security:** JSON Web Tokens (JWT), `bcryptjs`, `crypto` (SHA-256), `helmet`, `express-rate-limit`, `cookie-parser`
- **Architecture:** Modular MVC (Models, Controllers, Middlewares, Routes, Utils)

---

## 📂 Active Practical

| # | Practical Title | Key Concepts & Security Implementations | Status |
| :--- | :--- | :--- | :--- |
| **01** | [**Secure JWT Authentication & RBAC System**](./01-secure-jwt-rbac-auth) | Dual-Token Flow (Access + `httpOnly` Cookie Refresh Token), Token Rotation & Reuse Detection, Instant Session Revocation (`tokenVersion`), SHA-256 Hashed DB Tokens, Role-Based Access Control (`user`/`admin`), Rate Limiting & Helmet | ✅ **Completed** |
| `02` | [Advanced Product Catalog API](./02-advanced-product-catalog-api) | Search, Multi-Filter, Whitelisted Sorting, Pagination & DB Indexing | ✅ Completed |

---

## 🔐 Practical #01: Security Architecture Highlights
1. **Token Rotation & Reuse Detection:** Every refresh request invalidates the previous refresh token and issues a new pair. Reusing an old/stolen token immediately revokes all active sessions for that user.
2. **Instant Access Token Revocation (`tokenVersion`):** Logging out or logging in from a new device increments `tokenVersion`, immediately blocking active short-lived access tokens.
3. **Zero Plain-Text Secrets:** Refresh tokens are hashed via **SHA-256** before database storage, and transmitted via `httpOnly`, `sameSite: "strict"` cookies to prevent XSS and CSRF attacks.
4. **Privilege Escalation & Brute-Force Defense:** Public registration enforces hardcoded `"user"` roles, paired with IP-based rate limiting and strict input validation.

---

## ⚡ Practical #02: Performance & Security Architecture Highlights
1. **ReDoS & NoSQL Injection Prevention:** Sanitizes and escapes all special regex characters (`escapeRegex`) in search queries, preventing Regular Expression Denial of Service (ReDoS) and query operator injection attacks.
2. **Pagination DoS Protection & Sort Whitelisting:** Caps maximum items per page (`limit <= 50`) to prevent payload memory spikes, and strictly whitelists sortable fields (`price`, `rating`, `name`, `createdAt`) to block unauthorized schema probing.
3. **Parallel Query Execution (`Promise.all`):** Runs product retrieval (`find`) and total document counting (`countDocuments`) concurrently rather than sequentially, cutting database round-trip latency in half.
4. **MongoDB Indexing & `.lean()` Optimization:** Uses compound (`{ category: 1, price: 1 }`) and text indexes for fast filtering, paired with `.lean()` queries to bypass Mongoose hydration overhead and return lightweight JSON objects.

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mitesh6112004/mern-machine-coding-practicals.git
   cd mern-machine-coding-practicals
   ```