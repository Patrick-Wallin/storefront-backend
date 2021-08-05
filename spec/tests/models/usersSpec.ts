import { User, UserStore } from '../../../src/models/users';

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return no record at a start', async () => {
    const result = await store.index();
    expect(result).toHaveSize(0);
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: "Patrick",
      lastname: "Unknown"
    });
    expect(result).toEqual({
      id: 1,
      firstname: "Patrick",
      lastname: "Unknown"
    });
  });

  it('index method should return one record after creating user', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating user', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      firstname: "Patrick",
      lastname: "Unknown"
    });    
  });

  it('delete method should remove user (1)', async () => {
    const result = await store.delete(1);
    expect(result).toEqual(1);
  });

});