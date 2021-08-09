# Storefront Backend Project
This is a backend API project that is building in NodeJS.  It would provide information to the frontend developer.  The `REQUIREMENTS.md` would show database schema and API route information.  We will provide some example below.

## Table of Contents
* [General Info](#general-information)
* [Technologies](#technologies)
* [Install](#install)
* [Instruction of API Request](#instruction-of-api-request)
* [Purpose of this project](#purpose-of-this-project)
* [Contact](#contact)

## General Information
Front-end Developers would have an opportunity to gather or create data from users, products, or orders tables.  

Patrick would gain his experience developing this backend API while learning how to set up and work with Express server and Postgres including NPM, TypeScript, Jasmine, Winston, migration, models, handlers, RESTful API, JWT, bcrypt, and node.js.

## Technologies 
- TypeScript
- Express
- ESLint
- Prettier
- Jasmine
- Winston
- NPM
- NodeJS
- Migration
- JWT
- BCrypt


## Install
Install all the modules
```
npm install
```
Build or Convert TypeScript to JavaScript
```
npm run build
```
Start the server which will start nodemon based on src/index.ts
```
npm run start-ts 
```
Start the server which will start node based on dist/src/index.js
```
npm run start-js 
```
Run the test including running the migration such as down and up and Jasmine
```
npm run test  
```
Start the server based on JavaScript, not TypeScript
```
node dist/index.js
```
To keep the code look clean and nice, run the following command:
```
npm run prettier
```
To check any variable or analyze any code that may look the problem, run the following command:
```
npm run lint
```

## Instruction of API Request
Users 
- Create new user [POST]
  - Example: http://localhost:3000/user (along with POST information)
  - Input: firstname, lastname, password 
  - Authorization: none
  - Return: token authorization code
- Get all list of users [GET]
  - Example: http//localhost:3000/users
  - Input: none 
  - Authorization: Yes 
  - Return: list of users in JSON
- Get user's information based on user's id [GET]
  - Example: http://localhost:3000/user/1
  - Input: user id
  - Authorization: Yes 
  - Return: user's information in JSON
- Create user after login [POST]
  - Example: http://localhost:3000/user-after-login
  - Input: firstname, lastname, password
  - Authorization: Yes 
  - Return: token authorization code

Categories 
- Get list of category [GET]
  - Example: http://localhost:3000/categories
  - Input: none
  - Authorization: none
  - Return: list of category in JSON
- Get information about category based on category's id [GET]
  - Example: http://localhost:3000/category/1
  - Input: category id
  - Authorization: none
  - Return: category's information in JSON

Orders 
- Get list of orders that are active based on user's id [GET]
  - Example: http://localhost:3000/orders/1
  - Input: user id 
  - Authorization: Yes
  - Return: list of active orders in JSON
- Get list of orders that are completed based on user's id [GET]
  - Example: http://localhost:3000/orders/1
  - Input: user id 
  - Authorization: Yes
  - Return: list of completed orders in JSON

Products 
- Get list of products [GET]
  - Example: http://localhost:3000/products
  - Input: none
  - Authorization: none
  - Return: list of products in JSON
- Get information about product based on product id [GET]
  - Example: http://localhost:3000/product/1
  - Input: product id
  - Authorization: none
  - Return: product's information in JSON
- Get top five popular products [GET]
  - Example: http://localhost:3000/top-five-popular-products
  - Input: none
  - Authorization: none
  - Return: list of top five popular products in JSON
- Get list of products based on category's id [GET]
  - Example: http://localhost:3000/product-category/1
  - Input: category's id
  - Authorization: none
  - Return: information about products in JSON

## Purpose of this project
This is one of the Full Stack JavaScript Developer's project for Udacity.  It gives Patrick an opportunity to gain experience and knowledge of the following: Express, NodeJS, NPM, Jasmine, Winston, Migration, Models, Handlers, RESTful API, JWT, BCrypt, and TypeScript.

## Contact
Created by [Patrick Wallin](https://www.linkedin.com/in/patrick-wallin) - feel free to contact me!


