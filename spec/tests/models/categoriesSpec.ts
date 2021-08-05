import { Category, CategoryStore } from '../../../src/models/categories';

const store = new CategoryStore()

describe("Category Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of categories', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct category', async () => {
    const result = await store.show(12);
    expect(result).toEqual({
      id: 12,
      name: 'Computers'
    });
  });

});