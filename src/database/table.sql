CREATE TABLE users(
                     id VARCHAR(40) UNIQUE NOT NULL,
                     password VARCHAR(255) NOT NULL
);


CREATE TABLE files(
                     id SERIAL PRIMARY KEY,
                     name VARCHAR(255),
                     ext VARCHAR(255),
                     size INTEGER,
                     distance DECIMAL,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);