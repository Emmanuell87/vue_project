CREATE DATABASE IF NOT EXISTS cryptodb;

USE cryptodb;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (email)
)


    "cid": 1,
    "symbol": "BTCUSDT",
    "base": "BTC",
    "quote": "USDT",
    "name": "Bitcoin"

CREATE TABLE IF NOT EXISTS userCryptos (
    id INT NOT NULL AUTO_INCREMENT,
    assignedToUser VARCHAR(100) NOT NULL,
    cid INT NOT NULL,
    symbol VARCHAR(15) NOT NULL,
    base VARCHAR(15) NOT NULL,
    quote VARCHAR(15) NOT NULL,
    name VARCHAR(30) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (assignedToUser) REFERENCES users(email) ON DELETE CASCADE
)