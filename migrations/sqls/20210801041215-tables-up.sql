CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO categories (name) VALUES 
    ('Appliances'), 
    ('Apps & Games'), 
    ('Arts, Crafts, & Sewing'), 
    ('Automotive Parts & Accessories'),
    ('Baby'),
    ('Beauty & Personal Care'),
    ('Books'),
    ('CDs & Vinyl'),
    ('Cell Phones & Accessories'),
    ('Clothing, Shoes and Jewelry'),
    ('Collectibles & Fine Art'),
    ('Computers'),
    ('Electronics'),
    ('Garden & Outdoor'),
    ('Grocery & Gourmet Food'),
    ('Handmade'),
    ('Health, Household & Baby Care'),
    ('Home & Kitchen'),
    ('Industrial & Scientific'),
    ('Kindle'),
    ('Luggage & Travel Gear'),
    ('Movies & TV'),
    ('Musical Instruments'),
    ('Office Products'),
    ('Pet Supplies'),
    ('Sports & Outdoors'),
    ('Tools & Home Improvement'),
    ('Toys & Games'),
    ('Video Games');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(25),
    lastname VARCHAR(25),
    password VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC(10,2),
    category_id int REFERENCES categories(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id int REFERENCES products(id),
    quantity int,    
    user_id int REFERENCES users(id),
    status smallint
);
