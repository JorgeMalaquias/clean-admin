CREATE DATABASE clean_admin;

CREATE TABLE customer (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "email" varchar(30) NOT NULL UNIQUE,
    "phone" integer NOT NULL
)