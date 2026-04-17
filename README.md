# Finance Management Mini Application

A full-stack Finance Management web application demonstrating CRUD operations, dynamic UI capabilities, and sorting integration between a React (Mantine UI) Frontend and a Spring Boot Backend.

## Technology Stack
- **Frontend**: React, Vite, Mantine UI, Axios, Dayjs.
- **Backend**: Java 8, Spring Boot 2.7.18, Spring Data JPA, H2 Database (In-Memory).

## Requirements
- Java 8+ 
- Node.js & npm
- Maven (Embedded `mvnw` provided)

## Installation & Setup

### 1. Spring Boot Backend
The backend utilizes an in-memory H2 database, requiring no additional database server setup.

```bash
cd backend
./mvnw clean compile spring-boot:run
```
The server will start on port `8081`.
H2 Console is available at `http://localhost:8081/h2-console` (JDBC URL: `jdbc:h2:mem:financedb`, User: `sa`, Password: `password`).

### 2. React Frontend
The frontend utilizes Vite for rapid development.
```bash
cd frontend
npm install
npm run dev
```
The App will start typically on `http://localhost:5173`.

---

## Capabilities & Architecture
- **Audit Features**: Java's `@PrePersist` and `@PreUpdate` handle `createdDate`, `createdBy`, `editedDate`, and `editedBy` properties in a base `@MappedSuperclass`.
- **Custom UI**: Completely custom dark-mode enabled UI configured seamlessly with Mantine hooks, forms, and custom color overlays mapping onto conditional variables (Red for Expense, Green for Income).

## REST API Documentation

### Base URL: `http://localhost:8081/finance`

| Method | Endpoint         | Description                   | Details                                       |
|--------|------------------|-------------------------------|-----------------------------------------------|
| GET    | `/finance`       | Get all records               | Supports sorting. `?sort=amount,desc`         |
| GET    | `/finance/{id}`  | Get record by ID              | Returns a specific `FinanceRecord` object.    |
| POST   | `/finance`       | Create new record             | Pass JSON payload representing record.        |
| PUT    | `/finance/{id}`  | Update current record         | Replace the record's details based on JSON.   |
| DELETE | `/finance/{id}`  | Delete record                 | Returns `204 NO CONTENT`                      |

Example JSON Payload:
```json
{
  "userName": "John Doe",
  "type": "INCOME",
  "category": "Salary",
  "amount": 5000.00,
  "description": "Monthly pay",
  "date": "2026-04-01"
}
```
