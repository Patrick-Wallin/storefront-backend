import app from '../../../src/server';
import supertest from 'supertest';
import { Product, ProductStore } from '../../../src/models/products';
import { User, UserStore } from '../../../src/models/users';
import { Order, OrderStore } from '../../../src/models/orders';
import { OrderProducts, OrderProductsStore } from '../../../src/models/order_products';

const request = supertest(app);
const store = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();
const orderProductsStore = new OrderProductsStore();

describe('Testing Orders - API', function () {
  const name : Array<string> = ["Cyberpower PC", "Bill Gates PC"];
  const price : Array<number> = [1450.75, 500.78];
  const categoryId : number = 12;
  const firstName : string = "Maria";
  const lastName : string = "Tester";
  const password : string = "Maria-Tester";
  const quantity : number = 500;

  let token : string = '';
  let productId : Array<number> = new Array<number>();
  let userId : number = 0;
  let orderProductsId : Array<number> = new Array<number>();
  let orderId : number = 0;

  beforeAll(async() => {
    let response = await request.post('/user').send({firstname : firstName, lastname: lastName, password: password});    
    token = response.body;
    userId = await userStore.getUserIdBasedOnNames(firstName, lastName);

    response = await request.post('/product').set('Authorization', 'Bearer ' + token).send({name : name[0], price: price[0], category_id: categoryId});
    productId.push(response.body);

    response = await request.post('/product').set('Authorization', 'Bearer ' + token).send({name : name[1], price: price[1], category_id: categoryId});
    productId.push(response.body);
  });

  afterAll(async() => {      
    let result;
    for(let i = 0; i < orderProductsId.length; i++) {
        result = await orderProductsStore.delete(orderProductsId[i]);
    }
    result = await orderStore.delete(orderId);
    for(let i = 0; i < productId.length; i++) {
        result = await store.delete(productId[i]);
    }
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
        user_id: userId,
        status: parseInt(process.env.ACTIVE_ORDER!)
    });
    orderId = orderIdFromStore;
    expect(orderIdFromStore).toBeGreaterThanOrEqual(1);
  });

  it('respond with get as /orders/${userId} - status 200 (one record - active)', async () => {
    const response = await request.get(`/orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);    
  });

  it('Change order status to complete for ${orderId}', async () => {
    const rowsToBeUpdated = await orderStore.changeOrderToBeCompletedByOrder(orderId);
    expect(rowsToBeUpdated).toBeGreaterThanOrEqual(1);
  });

  it('respond with get as /completed-orders/${userId} - status 200 (one record for completed order)', async () => {
    const response = await request.get(`/completed-orders/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);    
  });

  // top five popular! 
  it('Show Top Five Popular. get as /top-five-popular-products', async () => {
    // Create two different products with two same products on same order id
    let orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[0],
        quantity: 50
    });
    orderProductsId.push(orderProductIdFromStore);

    orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[0],
        quantity: 100
    });
    orderProductsId.push(orderProductIdFromStore);

    orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[1],
        quantity: 25
    });
    orderProductsId.push(orderProductIdFromStore);

    orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[1],
        quantity: 75
    });
    orderProductsId.push(orderProductIdFromStore);

    orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[1],
        quantity: 5
    });
    orderProductsId.push(orderProductIdFromStore);

    orderProductIdFromStore = await orderProductsStore.create({
        order_id: orderId,
        product_id: productId[1],
        quantity: 1
    });
    orderProductsId.push(orderProductIdFromStore);

    const response = await request.get(`/top-five-popular-products`);
    expect(response.body).toHaveSize(2);
  });
});