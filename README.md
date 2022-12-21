# StorefrontBackend

Building API using Express & postgres

## set up steps

1- run "npm install" for package installaton

2- run "npm run migration:run" for DB set up
port: 5432

3- run "npm run dev" to start app

## API Endpoints

#### Users

-To create a user:
body ={
"first_name":"Tala",
"last_name":"Aloqily",
"password":"test234"
}
route: api/user/

---

-To get one user by id:

route: api/user/:id

---

-To get orders of user by id:

route: api/user/:id/orders

#### Products

To create a product:
body={
"product_name":"The Secret History",
"product_price":"80",
"product_category":"Book"
}
route: api/products/

---

To show a product by id:

route: api/products/:id

#### Orders

To create an order:
body: {
"status":"proccessing",
"user_id":"1"
}
route: api/orders/

---

To add products to an order:

route: api/orders/:id/products

---

To show a specific order by order_id:

route: api/orders/:id
