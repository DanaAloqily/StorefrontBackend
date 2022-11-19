import product from './product.type';


type order = {
ID: number;
products_id: (product)[];
user_id:"" ;
product_quantity: "";
order_status:"";

};

export default order;