import { Order, OrderStore } from '../../../src/models/orders';
import { User, UserStore } from '../../../src/models/users';
import { Product, ProductStore } from '../../../src/models/products';

const store = new OrderStore()
const userStore = new UserStore();
const productStore = new ProductStore();

describe("Order Model", () => {
    const firstName: string = "Patrick";
    const lastName: string = "Wallin";
    const productName: string = "Bill Gates PC";
    const productPrice: number = 100.00;
    const categoryId: number = 12;
    const orderQuantity: number = 5;

    let userId : number | undefined = 0;
    let productId : number = 0;
    let orderId : number | undefined = 0;
    
    beforeAll(async() => {
        const result = await userStore.create({
            firstname: firstName,
            lastname: lastName
        });
        userId = result.id;

        const product: Product = {
            name: productName,
            price: productPrice,
            category_id: categoryId
          };
      
          productId = await productStore.create(product);
    });

    afterAll(async() => {
        if(orderId != undefined) {
            const result = await store.delete(orderId);
        }
        if(userId != undefined) {
            const result = await userStore.delete(userId);
        }
        if(productId != undefined) {
            const result = await productStore.delete(productId);
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
      /*
    orderId = await store.create({
      product_id: productId,
      quantity: orderQuantity,
      user_id: userId!,
      status: parseInt(process.env.ACTIVE_ORDER!)
    });
    */
    orderId = await store.create({
        user_id: userId!,
        status: parseInt(process.env.ACTIVE_ORDER!)
      });
      expect(orderId).toBeGreaterThanOrEqual(1);
  });

  it('showActiveOrdersByUser method should return one record after creating an order with active', async () => {
    const result = await store.showActiveOrdersByUser(userId!);
    expect(result).toHaveSize(1);
  });

  it('showCompletedOrdersByUser method should return no record after creating an order that was active', async () => {
    const result = await store.showCompletedOrdersByUser(userId!);
    expect(result).toHaveSize(0);    
  });

  it('changeOrderToBeCompletedByOrder method should return one updated record after creating an order that was active', async () => {
    const result = await store.changeOrderToBeCompletedByOrder(orderId!);
    expect(result).toEqual(1);
  });

  it('showCompletedOrdersByUser method should return one record after updating the order that was active', async () => {
    const result = await store.showCompletedOrdersByUser(userId!);
    expect(result).toHaveSize(1);    
  });


});