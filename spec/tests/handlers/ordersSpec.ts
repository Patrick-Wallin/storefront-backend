import app from '../../../src/server';
import supertest from 'supertest';
import { Product, ProductStore } from '../../../src/models/products';
import { User, UserStore } from '../../../src/models/users';
import { Order, OrderStore } from '../../../src/models/orders';

const request = supertest(app);
const store = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

describe('Testing Products - API', function () {
  const name : string = "Cyberpower PC";
  const price : number = 1450.75;
  const categoryId : number = 12;
  const firstName : string = "Maria";
  const lastName : string = "Tester";
  const password : string = "Maria-Tester";
  const quantity : number = 500;

  let token : string = '';
  let productId : number = 0;
  let userId : number = 0;
  let orderId : Array<number> = new Array<number>();

  beforeAll(async() => {
    let response = await request.post('/user').send({firstname : firstName, lastname: lastName, password: password});    
    token = response.body;
    userId = await userStore.getUserIdBasedOnNames(firstName, lastName);

    response = await request.post('/product').set('Authorization', 'Bearer ' + token).send({name : name, price: price, category_id: categoryId});
    productId = response.body;
  });

  afterAll(async() => {
    let result;
    for(let i = 0; i < orderId.length; i++) {
        result = await orderStore.delete(orderId[i]);
    }
    result = await store.delete(productId);
    result = await userStore.delete(userId);
  });

  it('respond with get as /orders/${userId} - status 200 (no record)', async () => {
    const response = await request.get(`/orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(0);
    expect(response.status).toBe(200);    
  });

  it('respond with get as /completed-orders/${userId} - status 200 (no record for completed order)', async () => {
    const response = await request.get(`/completed-orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(0);
    expect(response.status).toBe(200);    
  });

  it('Create Order with responsing in order id', async () => {
    const orderIdFromStore = await orderStore.create({
        product_id: productId,
        quantity: quantity,
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });
    expect(orderIdFromStore).toBeGreaterThanOrEqual(1);
    orderId.push(orderIdFromStore);
  });

  it('respond with get as /orders/${userId} - status 200 (one record - active)', async () => {
    const response = await request.get(`/orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);    
  });

  it('Change order status to complete for ${orderId}', async () => {
    const rowsToBeUpdated = await orderStore.changeOrderToBeCompletedByOrder(orderId[0]);
    expect(rowsToBeUpdated).toBeGreaterThanOrEqual(1);
  });

  it('respond with get as /completed-orders/${userId} - status 200 (one record for completed order)', async () => {
    const response = await request.get(`/completed-orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);    
  });

  // top five popular! 
  it('Show Top Five Popular. get as /top-five-popular-products', async () => {
    // Create four more orders first with different number of quantity
    let orderIdFromStore = await orderStore.create({
        product_id: productId,
        quantity: 40,
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });

    orderId.push(orderIdFromStore);

    orderIdFromStore = await orderStore.create({
        product_id: productId,
        quantity: 100,
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });

    orderId.push(orderIdFromStore);

    orderIdFromStore = await orderStore.create({
        product_id: productId,
        quantity: 1,
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });

    orderId.push(orderIdFromStore);

    orderIdFromStore = await orderStore.create({
        product_id: productId,
        quantity: 5,
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });

    orderId.push(orderIdFromStore);

    const response = await request.get(`/top-five-popular-products`);
    expect(response.body).toHaveSize(5);
  });
});