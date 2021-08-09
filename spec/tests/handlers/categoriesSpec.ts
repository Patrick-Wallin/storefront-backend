import app from '../../../src/server';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing Categories - API', function () {
  it('respond with get as /categories - status 200', async () => {
    const response = await request.get('/categories');
    expect(response.status).toBe(200);
  });

  it('respond with list of categories', async () => {
    const response = await request.get('/categories');
    console.log(response.body.length);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('respond with one category (id = 12, name = Computers)', async () => {
    const response = await request.get('/category/12');
    expect(response.body.id).toEqual(12);
    expect(response.body.name).toEqual('Computers');
  });



});