# 02 — Advanced Product Catalog API

A RESTful Product Catalog backend built with **Node.js, Express, and MongoDB (Mongoose)** featuring multi-field search, dynamic filtering, sorting, pagination, database indexing, and API-key protected admin CRUD endpoints.

---

## Features

- **Keyword Search:** Case-insensitive regex search across `name`, `brand`, and `description` with regex injection sanitization.
- **Dynamic Filtering:** Filter products by `category`, `brand`, price range (`minPrice`, `maxPrice`), minimum `rating`, and stock availability (`inStock=true/false`).
- **Sorting & Pagination:** Sort by `price`, `rating`, `createdAt`, or `name` (ascending/descending) with safe `page` and `limit` bounds.
- **MongoDB Indexes:** Compound unique index on `{ name, brand }` (case-insensitive collation) plus category, price, and text indexes for fast query execution.
- **Admin Protection & Validation:** Header-based `x-admin-key` authentication for write operations and MongoDB `ObjectId` validation middleware.

---

## Project Structure

```text
02-advanced-product-catalog-api/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   └── productController.js   # Product CRUD, search, filter & pagination logic
│   ├── middlewares/
│   │   ├── adminAuth.js           # x-admin-key header authentication
│   │   ├── errorHandler.js        # Global error & duplicate/validation handler
│   │   └── validateObjectId.js    # MongoDB ObjectId format validator
│   ├── models/
│   │   └── Product.js             # Mongoose schema & database indexes
│   ├── routes/
│   │   └── productRoutes.js       # Public & admin-protected product routes
│   ├── seed/
│   │   └── seedProducts.js        # Sample product data seeder script
│   ├── utils/
│   │   └── queryHelper.js         # Safe filter builder & pagination/sort parser
│   └── app.js                     # Express app configuration & 404 handler
├── .env                           # Environment variables (ignored in Git)
├── .gitignore
├── package.json
├── README.md
└── server.js                      # Server entry point
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server health check |
| `GET` | `/api/products` | Public | Get products with search, filters, sort & pagination |
| `GET` | `/api/products/:id` | Public | Get a single product by ID |
| `POST` | `/api/products` | Admin (`x-admin-key`) | Create a new product |
| `PUT` | `/api/products/:id` | Admin (`x-admin-key`) | Update an existing product |
| `DELETE` | `/api/products/:id` | Admin (`x-admin-key`) | Delete a product |

---

## Example Query Requests

```http
GET /api/products?search=apple&category=electronics&sort=-price
GET /api/products?minPrice=10000&maxPrice=60000&minRating=4.5&inStock=true
GET /api/products?page=1&limit=5&sort=price
```

---

## How to Run Locally

1. **Clone the repository and navigate to the project folder:**
   ```bash
   git clone <your-repo-url>
   cd 02-advanced-product-catalog-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/product_catalog_db
   ADMIN_API_KEY=your_secret_admin_key
   ```

4. **Seed sample products into MongoDB:**
   ```bash
   node src/seed/seedProducts.js
   ```

5. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

6. **Verify server is running:**
   Open `http://localhost:5000/api/health` in your browser or Postman.