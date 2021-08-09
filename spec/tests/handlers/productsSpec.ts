import app from '../../../src/server';
import supertest from 'supertest';
import { Product, ProductStore } from '../../../src/models/products';
import { User, UserStore } from '../../../src/models/users';

const request = supertest(app);
const store = new ProductStore();
const userStore = new UserStore();

describe('Testing Products - API', function () {
  const name : string = "Cyberpower PC";
  const price : number = 1450.75;
  const categoryId : number = 12;
  const firstName : string = "Maria";
  const lastName : string = "Tester";
  const password : string = "Maria-Tester";

  let token : string = '';
  let productId : number = 0;
  let userId : number = 0;
  
  beforeAll(async() => {
    const response = await request.post('/user').send({firstname : firstName, lastname: lastName, password: password});    
    token = response.body;
    userId = await userStore.getUserIdBasedOnNames(firstName, lastName);
  });

  afterAll(async() => {
    let result = await store.delete(productId);
    result = await userStore.delete(userId);
  });

  it('respond with get as /products - status 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);    
  });

  it('respond with get as /product/1000 - status 400', async () => {
    const response = await request.get('/product/1000');
    expect(response.status).toBe(400);    
  });

  it('Create product and respond with product id (POST on /product)', async () => {
    const response = await request.post('/product').set('Authorization', 'Bearer ' + token).send({name : name, price: price, category_id: categoryId});
    expect(response.body).toBeTruthy();
    expect(response.status).toBe(200);    
    productId = response.body;
  });

  it('respond with get as /product/${productId} - status 200', async () => {
    const response = await request.get(`/product/${productId}`);
    expect(response.status).toBe(200);    
  });

  it('respond with get as /product-category/${categoryId} - status 200', async () => {
    const response = await request.get(`/product-category/${categoryId}`);
    expect(response.status).toBe(200);    
  });

  // top five popular! 

});