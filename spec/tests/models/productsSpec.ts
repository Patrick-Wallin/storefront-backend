import { Product, ProductStore } from '../../../src/models/products';

const store = new ProductStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a top five popular method', () => {
    expect(store.showTopFivePopular).toBeDefined();
  });

  it('should have a show by category method', () => {
    expect(store.showByCategory).toBeDefined();
  });
  
  it('index method should return no record at a start', async () => {
    const result = await store.index();
    expect(result).toHaveSize(0);
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: "Bill Gates PC",
      price: 500.99,
      category_id: 12
    });
    expect(result).toEqual(1);
  });

  it('index method should return one record after creating product', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
        id : 1,
        name: "Bill Gates PC",
        price: 500.99,
        category_id: 12
      });    


  });


});