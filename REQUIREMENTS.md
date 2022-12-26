# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `api/products/` [GET]
- Show: `api/products/:id` [GET]
- Create (args: product)[token required] :`api/products/` [POST]

#### Users

- Index [token required]: `api/user/` [GET]
- Show [token required]: `api/user/:id` [GET]
- Create N(args: user)[token required]: `api/user/` [POST]

#### Orders

- Current Order by user (args: user id)[token required]: `api/orders/:user_id/` [GET]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

CREATE TABLE products( id SERIAL PRIMARY KEY,
product_name VARCHAR(255),
product_price VARCHAR(255),
product_category VARCHAR(255)
)

#### User

- id
- firstName
- lastName
- password

CREATE TABLE users(id SERIAL PRIMARY KEY ,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE orders(id SERIAL PRIMARY KEY,
status VARCHAR(50),
user_id bigint REFERENCES users(id)
)

CREATE TABLE order_products(id SERIAL PRIMARY KEY,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id),
quantity integer
)
