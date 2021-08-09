import app from '../../../src/server';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing Users - API', function () {
  const firstName : string = "David";
  const lastName : string = "World";
  const password: string = "SimplePassword";

  let token : string = '';
  let userId : number = 0;
  
  it('respond with get as /users - status 401 (token required)', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);    
  });

  it('respond with get as /user/1 - status 401 (token required)', async () => {
    const response = await request.get('/user/1');
    expect(response.status).toBe(401);    
  });

  it('Create user and respond with token (POST on /user)', async () => {
    const response = await request.post('/user').send({firstname : firstName, lastname: lastName, password: password});    
    token = response.body;
    expect(response.body).toBeTruthy();
    expect(response.status).toBe(200);    
  });

  it('Create user and respond with token (POST on /user) - Expect to be failed since it was already in the table', async () => {
    const response = await request.post('/user').send({firstname : firstName, lastname: lastName, password: password});    
    expect(response.status).toBe(400);    
  });

  it('respond with get as /users - status 200 since we have token now', async () => {
    const response = await request.get('/users').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);    
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    userId = response.body[0].id;
  });

  it('respond with get as /user/{userId} - status 200 since we have token now', async () => {
    const response = await request.get(`/user/${userId}`).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);    
  });

});