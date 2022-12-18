CREATE TABLE orders(id SERIAL PRIMARY KEY,
status VARCHAR(50),
product_quantity VARCHAR(255),
product_id INT(255) REFERENCES products(id),
user_id INT(255) REFERENCES users(id)
);

