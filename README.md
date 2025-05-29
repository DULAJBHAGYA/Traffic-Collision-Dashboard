## 🚦 Traffic Collision App – Setup & Run Instructions

This project is a **full-stack traffic collision analytics app** built with:

* **Backend**: Spring Boot (`server/`)
* **Frontend**: React + Vite (`client/`)
* **Database**: MySQL (running via MAMP, managed through MySQL Workbench)

---

## 📁 Project Structure

```
traffic-collision-app/
├── server/              # Spring Boot backend (Eclipse)
├── client/              # React Vite frontend (VS Code)
├── collisions.csv       # CSV file with traffic collision data
└── README.md            # Setup guide (this file)
```

---

## 🛠️ Prerequisites

* ✅ [MAMP](https://www.mamp.info/en/) – for running MySQL (set to port **3306**)
* ✅ [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) – for running SQL queries
* ✅ [Eclipse IDE](https://www.eclipse.org/) – for the Spring Boot backend
* ✅ [Node.js & npm](https://nodejs.org/) – for React frontend
* ✅ [VS Code](https://code.visualstudio.com/) – for frontend development

---

## 🔢 Step 1: MySQL Setup

### 1. Start MAMP

* Open **MAMP**
* Start the **MySQL server** (make sure it's on **port 3306**)

### 2. Open MySQL Workbench

* Connect to the MySQL server using `localhost:3306`
  (use default user: `root`, password: `root` or the one you set in MAMP)

### 3. Create the `collisions` Database and Tables

```sql
CREATE DATABASE IF NOT EXISTS collisions;
USE collisions;

-- Create 'collisions' table
CREATE TABLE IF NOT EXISTS collisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statistic_code VARCHAR(20) NOT NULL,
    statistic_label VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    month_code VARCHAR(10),
    month_name VARCHAR(20),
    unit VARCHAR(50) NOT NULL,
    value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

### 4. Import the CSV File into `collisions` Table

In **MySQL Workbench**:

1. Go to your connection and run `USE collisions;`
2. Use the **Table Data Import Wizard**:

   * Right-click the `collisions` table → **Table Data Import Wizard**
   * Select your `collisions.csv` file
   * Map columns appropriately
   * Finish the import

---

## 🚀 Step 2: Run the Backend (`server/`)

### 1. Open in Eclipse

* Import the Spring Boot project from the `server/` folder.

### 2. Update Maven

* Right-click the project → **Maven** → **Update Project**

### 3. Configure `application.properties`

In `server/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/collisions
spring.datasource.username=root
spring.datasource.password=root  # change if your MAMP password is different

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### 4. Run the Application

* Navigate to `ServerApplication.java`
* Right-click → **Run As** → **Java Application**

✅ Backend should now be running at `http://localhost:8080`

---

## 🌐 Step 3: Run the Frontend (`client/`)

### 1. Open the client folder in VS Code

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

✅ You'll get output like:

```
Local:   http://localhost:5173/
```

### 4. Open in browser

* Visit `http://localhost:5173/`

---

## 🧠 Quick Summary of Commands

### SQL (in MySQL Workbench):

```sql
CREATE DATABASE IF NOT EXISTS collisions;
USE collisions;

CREATE TABLE IF NOT EXISTS collisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statistic_code VARCHAR(20) NOT NULL,
    statistic_label VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    month_code VARCHAR(10),
    month_name VARCHAR(20),
    unit VARCHAR(50) NOT NULL,
    value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

### Frontend (in `client/`):

```bash
npm install
npm run dev
```

---

## 🧰 Tech Stack

| Component | Technology         |
| --------- | ------------------ |
| Backend   | Spring Boot (Java) |
| Frontend  | React + Vite       |
| Database  | MySQL (via MAMP)   |
| IDE       | Eclipse, VS Code   |
| Tools     | MySQL Workbench    |

