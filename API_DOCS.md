# 📚 Library Management API - Quick Reference

**Base URL:** `http://localhost:3000/api`

---

## 📖 Book Endpoints

### Create Book

```http
POST /api/books
```

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "FICTION",
  "isbn": "9780743273565",
  "description": "A story of the fabulously wealthy Jay Gatsby",
  "copies": 3
}
```

### Get All Books

```http
GET /api/books
GET /api/books?filter=SCIENCE&sort=desc&limit=5
```

### Get Book by ID

```http
GET /api/books/:bookId
```

### Update Book

```http
PUT /api/books/:bookId
```

```json
{
  "copies": 5,
  "description": "Updated description"
}
```

### Delete Book

```http
DELETE /api/books/:bookId
```

---

## 📚 Borrow Endpoints

### Borrow a Book

```http
POST /api/borrow
```

```json
{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-01-15T00:00:00.000Z"
}
```

### Get Borrowed Books Summary

```http
GET /api/borrow
```

---

## 🎯 Available Genres

- `FICTION`
- `NON_FICTION`
- `SCIENCE`
- `HISTORY`
- `BIOGRAPHY`
- `FANTASY`

## 🔧 Query Parameters

- `filter` - Filter by genre
- `sort` - `asc` or `desc`
- `sortBy` - Field to sort by (default: `createdAt`)
- `limit` - Number of results (default: 10)
