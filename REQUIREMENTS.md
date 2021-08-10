# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route: '/products' [GET]
- Show route: '/product/:id' [GET] 
- Create route: '/product' [POST][token required]
- Show route - Top 5 most popular products: '/top-five-popular-products' [GET]
- Show route - Products by category (args: product category): '/product-category/:categoryid' [GET]

#### Users
- Index route: '/users' [GET] [token required]
- Show route: '/user/:id' [GET][token required]
- Create route: '/user' [POST]
- Create After Login route: '/user-after-login' [POST][token required]

#### Orders
- Show route - Current Order by user (args: user id): '/orders/:userid' [GET][token required]
- Show route - Completed Orders by user (args: user id): '/completed-orders/:userid' [GET][token required]

## Data Shapes
#### Products
- id : PRIMARY KEY : integer
- name : varchar(100)
- price : numeric(10,2)
- category : integer - reference from Category table (id)

#### Categories
- id : PRIMARY KEY : integer
- name : varchar(100)

#### Users
- id : PRIMARY KEY : integer
- firstName : varchar(25)
- lastName: varchar(25)
- password: varchar(25)

#### Orders
- id : PRIMARY KEY : integer
- user_id: integer - reference from user (id)
- status of order (active or complete): smallint (1 = active, 2 = complete)

#### Order_Products
- id : PRIMARY KEY : integer
- id of each product in the product: integer - reference from product (id)
- id of each order in the order: integer - reference from order (id)
- quantity of each product in the order: integer
