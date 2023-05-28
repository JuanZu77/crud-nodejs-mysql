CREATE DATABASE crudenodemysql;

use crudenodemysql;

CREATE TABLE customer(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(50) NOT NULL,
    dir VARCHAR(100) NOT NULL,
    phone  VARCHAR(15)
);

SHOW TABLES;

DESCRIBE customer;



