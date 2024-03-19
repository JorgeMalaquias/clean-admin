CREATE DATABASE clean_admin;

CREATE TABLE customers (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "email" varchar(30) NOT NULL UNIQUE,
    "phone" bigint NOT NULL
);

CREATE TABLE localizations (
    "id" serial PRIMARY KEY,
    "x" bigint NOT NULL,
    "y" bigint NOT NULL,
    "routePosition" integer NOT NULL UNIQUE,
    "customerId" integer REFERENCES customers(id) NOT NULL UNIQUE
);