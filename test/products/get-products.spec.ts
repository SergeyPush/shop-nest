import * as supertest from 'supertest';
import { BASE_URL } from '../test.constants';

describe('Get Products', () => {
  const request = supertest(BASE_URL);

  it('should get all products', async () => {
    const res = await request.get('/products');
    const products = res.body;

    expect(products).toBeInstanceOf(Array);
    expect(res.status).toBe(200);
    expect(products.length).toBeGreaterThan(1);
    expect(products[0]).toHaveProperty('title');
    expect(products[0]).toHaveProperty('description');
    expect(products[0]).toHaveProperty('price');
    expect(products[0]).toHaveProperty('createdAt');
    expect(products[0]).toHaveProperty('updatedAt');
  });

  it('should get one product', async () => {
    const res = await request.get('/products');
    const product = res.body;
    const id = product[0].id;

    const resProduct = await request.get(`/products/${id}`);
    expect(resProduct.status).toBe(200);
    const products = resProduct.body;
    expect(products).toHaveProperty('title');
    expect(products).toHaveProperty('description');
    expect(products).toHaveProperty('price');
    expect(products).toHaveProperty('createdAt');
    expect(products).toHaveProperty('updatedAt');
  });
});
