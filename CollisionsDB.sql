USE collisions;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL
);

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

SELECT * FROM collisions;

INSERT INTO users (username, password)
VALUES ('CCT1234', '54321');

SELECT * FROM users;

