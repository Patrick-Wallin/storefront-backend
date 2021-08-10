import { Order, OrderStore } from '../../../src/models/orders';
import { OrderProducts, OrderProductsStore } from '../../../src/models/order_products';
import { User, UserStore } from '../../../src/models/users';
import { Product, ProductStore } from '../../../src/models/products';

const store = new OrderProductsStore()
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("OrderProducts Model", () => {
    const firstName: string = "Patrick";
    const lastName: string = "Wallin";
    const productName: string = "Bill Gates PC";
    const productPrice: number = 100.00;
    const categoryId: number = 12;
    const orderQuantity: number = 5;

    let userId : number | undefined = 0;
    let productId : number = 0;
    let orderId : number | undefined = 0;
    let orderProductsId : number[] = new Array();

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

          orderId = await orderStore.create({
            user_id: userId!,
            status: parseInt(process.env.ACTIVE_ORDER!)
          });
    });

    afterAll(async() => {
        if(orderProductsId != undefined) {
            for(let id of orderProductsId) {
                const result = await store.delete(id);
            }
        }
        if(orderId != undefined) {
            const result = await orderStore.delete(orderId);
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

  it('create method should add an order and product into order_products', async () => {
      let listOfOrderProducts : OrderProducts[] = new Array<OrderProducts>();
      listOfOrderProducts.push({ order_id: orderId!, quantity: 50, product_id: productId});
      listOfOrderProducts.push({ order_id: orderId!, quantity: 100, product_id: productId});

      for(let val of listOfOrderProducts) {
        const id = await store.create(val);
        orderProductsId?.push(id);
      }
    
    expect(orderProductsId).toHaveSize(2);
  });

});