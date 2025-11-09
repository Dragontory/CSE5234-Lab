# CSE5234-Lab / jetstore

A small Create React App project named `jetstore` used for CSE5234 lab.

## What this is

This repository contains a React application scaffolded with Create React App (uses `react-scripts`). It includes simple components under `src/components/` and the usual CRA structure.

## Install dependencies

From the project root (`jetstore` folder):

```powershell
cd 'c:\Users\toryy\OneDrive\Documents\Visual Studio Code\CSE 5234\CSE5234-Lab\jetstore'
npm install
```

## Run the development server

Start the app:

```powershell
npm start
```

The app will be served at `http://localhost:3000` (or the port you choose).

## Build for production

```powershell
npm run build
```

## RDS MySQL - Connection & Schema

### Connection Info

user: admin  
password: admin123  
url: warehouse-db.c9koiciwmqnp.us-east-2.rds.amazonaws.com  
port: 3306  
database: warehouse_db

### Schema

```sql
CREATE TABLE ITEM (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ITEM_NUMBER INT,
  NAME VARCHAR(255),
  DESCRIPTION VARCHAR(255),
  AVAILABLE_QUANTITY INT,
  UNIT_PRICE DOUBLE
  IMAGE_URL VARCHAR(500);
);

CREATE TABLE SHIPPING_INFO (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ADDRESS VARCHAR(255),
  CITY VARCHAR(255),
  STATE VARCHAR(255),
  ZIP_CODE VARCHAR(20),
  COUNTRY VARCHAR(50)
);

CREATE TABLE PAYMENT_INFO (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  CARD_NUMBER VARCHAR(50),
  CARD_TYPE VARCHAR(20),
  EXPIRATION_DATE VARCHAR(10),
  BILLING_ADDRESS VARCHAR(255)
);

CREATE TABLE CUSTOMER_ORDER (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  CUSTOMER_NAME VARCHAR(255),
  CUSTOMER_EMAIL VARCHAR(255),
  SHIPPING_INFO_ID_FK INT,
  PAYMENT_INFO_ID_FK INT,
  STATUS VARCHAR(255) DEFAULT 'New',
  FOREIGN KEY (SHIPPING_INFO_ID_FK) REFERENCES SHIPPING_INFO(ID),
  FOREIGN KEY (PAYMENT_INFO_ID_FK) REFERENCES PAYMENT_INFO(ID)
);

CREATE TABLE CUSTOMER_ORDER_LINE_ITEM (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ITEM_ID INT,
  ITEM_NAME VARCHAR(255),
  QUANTITY INT,
  CUSTOMER_ORDER_ID_FK INT,
  FOREIGN KEY (CUSTOMER_ORDER_ID_FK) REFERENCES CUSTOMER_ORDER(ID)
);
