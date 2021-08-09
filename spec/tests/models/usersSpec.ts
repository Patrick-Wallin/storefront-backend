import { User, UserStore } from '../../../src/models/users';

const store = new UserStore()

describe("User Model", () => {
  const firstName = "Bill";
  const lastName = "Gates";
  
  let userId : number = 0;

  beforeAll(async() => {
    const result = await store.deleteAll();
  });

  afterAll(async() => {
    const result = await store.deleteAll();
  });

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
    const resultFromCreate = await store.create({
      firstname: firstName,
      lastname: lastName
    });

    userId = await store.getUserIdBasedOnNames(firstName, lastName);

    expect(userId).toBeGreaterThanOrEqual(1);
  });

  it('index method should return one record after creating user', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating user', async () => {
    const result = await store.show(userId);
    expect(result).toEqual({
      firstname: firstName,
      lastname: lastName
    });    
  });

  it('delete method should remove user', async () => {
    const result = await store.delete(userId);
    expect(result).toEqual(1);
  });

});