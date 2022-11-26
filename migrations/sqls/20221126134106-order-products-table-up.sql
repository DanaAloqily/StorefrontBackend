CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderID bigint REFERENCES orders(id),
    ProductID bigint REFERENCES products(id)
);