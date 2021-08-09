import { Product, ProductStore } from '../../../src/models/products';

const store = new ProductStore()

describe("Product Model", () => {
  const name: string = "Bill Gates PC";
  const price: number = 500.99;
  const categoryId: number = 12;

  let productId: number = 0;

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
    productId = await store.create({
      name: name,
      price: price,
      category_id: categoryId
    });

    expect(productId).toBeGreaterThanOrEqual(1);
  });

  it('index method should return one record after creating product', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating product', async () => {
    const result = await store.show(productId);
    expect(result).toEqual({
        id : productId,
        name: name,
        price: price,
        category_id: categoryId
      });    
  });

  it('delete method should remove product', async () => {
    const result = await store.delete(productId);
    expect(result).toEqual(1);
  });

});