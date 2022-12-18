CREATE TABLE order_products(
    order_id bigint REFERENCES orders(id),
    Product_id bigint REFERENCES products(id),
    quantity integer,
    product_price VARCHAR(50)
);