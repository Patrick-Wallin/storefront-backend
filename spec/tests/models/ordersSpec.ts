import { Order, OrderStore } from '../../../src/models/orders';
import { User, UserStore } from '../../../src/models/users';

const store = new OrderStore()
const userStore = new UserStore();

describe("Order Model", () => {
    let userId : number = 0;
    beforeAll(async() => {
        const result = await userStore.create({
            firstname: "Patrick",
            lastname: "Unknown"
        });
        userId = result.id?
    });

    afterAll(async() => {
        if(userId != null) {
            const result = await userStore.delete(userId);
        }
    });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a showActiveOrdersByUser method', () => {
    expect(store.showActiveOrdersByUser).toBeDefined();
  });

  it('should have a showCompletedOrdersByUser method', () => {
    expect(store.showCompletedOrdersByUser).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await store.create({
      product_id: 12,
      quantity: 5,
      user_id: 1,
      status: parseInt(process.env.ACTIVE_ORDER!)
    });
    expect(result).toEqual({
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: parseInt(process.env.ACTIVE_ORDER!)
      });
  });

  it('showActiveOrdersByUser method should return one record after creating an order with active', async () => {
    const result = await store.showActiveOrdersByUser(1);
    expect(result[0]).toEqual({
        id: 1,
        product_id : 12,
        quantity: 5,
        user_id : 1,
        status: parseInt(process.env.ACTIVE_ORDER!)
      });    
  });

  it('showCompletedOrdersByUser method should return no record after creating an order that was active', async () => {
    const result = await store.showCompletedOrdersByUser(1);
    expect(result).toHaveSize(0);    
  });


});