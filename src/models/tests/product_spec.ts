import product from '../../types/product.type';
import productModel from '../product.model';

const Product = new productModel();
const prod = {
  id: 1,
  product_name: 'Socks',
  product_price: '15',
  product_category: 'cloting'
} as product;

describe('product model', () => {
  it('should have an index method', () => {
    expect(Product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(Product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(Product.create).toBeDefined();
  });

  it('index method should return list of products', async () => {
    const result = await Product.index;
    expect(result).toBeDefined;
  });

  it('create method should add a product', async () => {
    const result = await Product.create({
      id: 1,
      product_name: 'Socks',
      product_price: '15',
      product_category: 'clothing'
    });
    expect(result).toEqual({
      id: result.id,
      product_name: result.product_name,
      product_price: result.product_price,
      product_category: result.product_category
    });
  });

  it('returns a product from id', async () => {
    const result = await Product.show('1');

    expect(result).toEqual({
      id: result.id,
      product_name: result.product_name,
      product_price: result.product_price,
      product_category: result.product_category
    });
  });
});
