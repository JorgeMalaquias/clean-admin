CREATE DATABASE clean_admin;

CREATE TABLE customers (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "email" varchar(30) NOT NULL UNIQUE,
    "phone" bigint NOT NULL
);