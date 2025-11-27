CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    status TINYINT UNSIGNED DEFAULT 0 COMMENT '0=normal,1=disabled,2=banned',

    metadata JSON NULL COMMENT 'Extra metadata',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL DEFAULT NULL,

    UNIQUE KEY uniq_username(username),
    UNIQUE KEY uniq_email(email),
    KEY idx_status(status)
)
CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE Car (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    registrationNumber VARCHAR(255) NOT NULL,

    brand VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    status TINYINT UNSIGNED DEFAULT 0 COMMENT '0=normal,1=disabled,2=banned',

    metadata JSON NULL COMMENT 'Extra metadata',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL DEFAULT NULL,

    UNIQUE KEY uniq_username(username),
    UNIQUE KEY uniq_email(email),
    KEY idx_status(status)
)
CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE owners (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(255),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO owners (name, firstname, lastname, phone, email, address) VALUES
-- 1. 完整示例
('Jane Doe', 'Jane', 'Doe', '603-555-1212', 'jane.doe@example.com', '123 Main Street, Suite 100, Anytown, CA 90210'),

-- 2. 仅包含必填字段 (phone, email, address 默认为 NULL)
('John Smith', 'John', 'Smith', NULL, NULL, NULL),

-- 3. 亚洲名字示例 (只有 email)
('Wei Chen', 'Wei', 'Chen', NULL, 'wei.chen@business.net', NULL),

-- 4. 欧洲名字示例 (只有 phone 和 address)
('Pierre Dubois', 'Pierre', 'Dubois', '+33 6 1234 5678', NULL, '45 Rue de la Paix, Paris, France'),

-- 5. 带有显式 NULL 值的示例
('Alicia Garcia', 'Alicia', 'Garcia', NULL, 'alicia.g@mail.org', NULL),

-- 6. 另一个完整示例
('Robert Jones', 'Robert', 'Jones', '555-0101', 'robertj@company.com', '789 Oak Ave, Apt 3B, Metropolis, NY 10001'),

-- 7. 仅必填字段和电话
('Maria Silva', 'Maria', 'Silva', '+55 11 98765-4321', NULL, NULL),

-- 8. 仅必填字段和地址
('Kenji Tanaka', 'Kenji', 'Tanaka', NULL, NULL, '1-2-3 Ginza, Chuo-ku, Tokyo, Japan'),

-- 9. 带有很长地址的示例
('Elizabeth Holmes', 'Elizabeth', 'Holmes', NULL, 'liz.h@private.net', 'The Penthouse, 888 Luxury Tower, Riverside Drive, Financial District, London, UK SW1A 0AA'),

-- 10. 批处理示例的最后两条记录
('Alex Johnson', 'Alex', 'Johnson', '444-999-0000', NULL, NULL),
('Sarah Lee', 'Sarah', 'Lee', '111-222-3333', NULL, NULL);

CREATE TABLE Cars (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    registrationNumber VARCHAR(255) NOT NULL,

    modelYear DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',

    owner_id BIGINT UNSIGNED,
    CONSTRAINT fk_car_owner
        FOREIGN KEY (owner_id)
        REFERENCES owners(id),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY idx_brand(brand),
    KEY idx_price(price)
)
CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO cars 
(brand, model, color, registrationNumber, modelYear, price, currency, owner_id) 
VALUES
('Toyota', 'Camry', 'White', 'ABC-1234', '2020-01-01', 25000.00, 'USD', 1),
('Honda', 'Civic', 'Black', 'XYZ-5678', '2019-01-01', 22000.00, 'USD', 2),
('BMW', 'X5', 'Blue', 'BWM-9988', '2021-01-01', 60000.00, 'USD', 3),
('Mercedes-Benz', 'C300', 'Silver', 'MBZ-3344', '2022-01-01', 52000.00, 'USD', 4),
('Tesla', 'Model 3', 'Red', 'TES-1122', '2023-01-01', 48000.00, 'USD', 1),
('Ford', 'F-150', 'Gray', 'F150-7788', '2018-01-01', 35000.00, 'USD', 5),
('Audi', 'A4', 'White', 'AUD-5566', '2020-01-01', 41000.00, 'USD', 2),
('Nissan', 'Altima', 'Blue', 'NIS-6677', '2017-01-01', 18000.00, 'USD', 3),
('Hyundai', 'Elantra', 'Black', 'HYU-4433', '2021-01-01', 19000.00, 'USD', 4),
('Kia', 'Sportage', 'Green', 'KIA-8899', '2022-01-01', 26000.00, 'USD', 5),
('Volkswagen', 'Golf', 'Yellow', 'VW-2233', '2019-01-01', 23000.00, 'USD', 1),
('Chevrolet', 'Malibu', 'Gray', 'CHE-9900', '2020-01-01', 24000.00, 'USD', 2);


CREATE TABLE app_user (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,          -- 建议存储加密后的密码（BCrypt hash）

    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO app_user (username, password, role)
VALUES
('user1', '$2b$10$EIXhV6bS0rI0hMa5/Hy1N.p2o5xJf4sH0o6i7zi9RBsSmzKH6HMvG', 'user'),
('user2', '$2b$10$JdQtFqj7Yub2s0uQYiny3uHnh5Jnb3.3r8VqtiCfZwZqNY5MBYbUq', 'user'),
('admin1', '$2b$10$hMf7mX64pKpGmEIOCqcd3uwOwrY9z0ZLfQfAygw7OaS8UjG2aHKDG', 'admin');
| username | password 原文 | hash                   |
| -------- | ----------- | ---------------------- |
| user1    | password123 | `$2b$10$EIXhV6bS0r...` |
| user2    | hello2024   | `$2b$10$JdQtFqj7Yu...` |
| admin1   | admin999    | `$2b$10$hMf7mX64pK...` |


INSERT INTO app_user (username, password, role)
VALUES
("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"),
("admin","$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN");
// Username: user, password: user
// Username: admin, password: admin

