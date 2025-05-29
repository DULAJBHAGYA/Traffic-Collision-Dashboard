Here's a complete and **explainable README file** for your Traffic Collision App, covering **Spring Boot backend**, **React Vite frontend**, and **MySQL setup using MAMP**. This includes all necessary **commands and steps** for importing the database, setting up the backend and frontend, and running the application.

---

## 🚦 Traffic Collision App – Setup & Run Instructions

This project is a **full-stack web application** for managing and analyzing traffic collisions.
It is built with:

* **Backend**: Spring Boot (Java)
* **Frontend**: React with Vite
* **Database**: MySQL (via MAMP)

---

### 📁 Project Structure

```
traffic-collision-app/
├── backend/                 # Spring Boot backend (Eclipse)
├── frontend/                # React Vite frontend (VS Code)
├── collisions.csv           # CSV file with collision data
└── README.md                # Setup instructions
```

---

## 🛠️ Prerequisites

* [MAMP](https://www.mamp.info/en/) installed and running on port **3306**
* [Eclipse IDE](https://www.eclipse.org/) for backend
* [Node.js & npm](https://nodejs.org/) installed
* [VS Code](https://code.visualstudio.com/) or any preferred code editor for frontend
* Git (optional, for version control)

---

## 🔢 Step 1: MySQL Setup via MAMP

### 1. Start MAMP:

* Open MAMP
* Start **MySQL server** (make sure it's running on **port 3306**)

### 2. Open phpMyAdmin:

* Go to `http://localhost/phpmyadmin`

### 3. Create Database:

```sql
CREATE DATABASE collisions;
USE collisions;
```

### 4. Create `collisions` Table (matching your CSV fields):

Example:

```sql
CREATE TABLE collisions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    location VARCHAR(255),
    cause VARCHAR(255),
    severity VARCHAR(100),
    vehicles_involved INT
);
```

> ⚠️ Adjust field names/types based on your CSV headers.

### 5. Import `collisions.csv`:

1. Go to **phpMyAdmin** → Select **collisions** database
2. Go to **Import** tab
3. Upload `collisions.csv`
4. Choose **CSV format**
5. Set **First row = column names**
6. Click **Go**

### 6. Create `users` Table:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
```

---

## 🚀 Step 2: Run Spring Boot Backend (Eclipse)

### 1. Open the project in Eclipse

### 2. Update Maven:

* Right-click the project → **Maven** → **Update Project**

### 3. Configure `application.properties`:

Make sure your `src/main/resources/application.properties` file contains:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/collisions
spring.datasource.username=root
spring.datasource.password=root   # or your MAMP password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Run the application:

* Go to `ServerApplication.java` (main class)
* Right-click → **Run As** → **Java Application**

✅ Backend should now run on `http://localhost:8080`

---

## 🌐 Step 3: Run React Vite Frontend

### 1. Open frontend folder in VS Code:

```bash
cd frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start frontend:

```bash
npm run dev
```

✅ This will show a local link like:

```
Local:   http://localhost:5173/
```

### 4. Open the app:

* Click or open the link in your browser

---

## ✅ Summary of Commands

### 💾 SQL Commands:

```sql
CREATE DATABASE collisions;
USE collisions;

CREATE TABLE collisions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    location VARCHAR(255),
    cause VARCHAR(255),
    severity VARCHAR(100),
    vehicles_involved INT
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
```

---

## 💡 Notes

* Ensure your MySQL user and password match what's in your Spring Boot config.
* Make sure ports are not blocked (3306 for MySQL, 8080 for backend, 5173 for frontend).
* If using CORS in the backend, allow frontend origin `http://localhost:5173`.

---

## 🧑‍💻 Tech Stack

| Component | Technology         |
| --------- | ------------------ |
| Backend   | Spring Boot (Java) |
| Frontend  | React + Vite       |
| Database  | MySQL (MAMP)       |
| IDE       | Eclipse, VS Code   |

---

Let me know if you'd like the README in `.md` format as a downloadable file.
