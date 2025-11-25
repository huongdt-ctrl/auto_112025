const { test, expect, request } = require('@playwright/test');

test.describe('JSONPlaceholder API Demo', () => {

  let api;

  test.beforeAll(async () => {
 
    api = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test.afterAll(async () => {
    await api.dispose();
  });

 
  test('GET - Lấy danh sách users', async () => {
    const res = await api.get('/users');
    expect(res.status()).toBe(200);

    const body = await res.json();
    console.log('Users:', body);

    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
  });
 
  test('POST - Tạo post mới', async () =>{
    const res = await api.post('/posts',{
        data: {
            userId: 1,
            id: 1,
            title: "Tao post moi",
            body: "hello my friend"
    }
  });
    expect (res.status()).toBe(201);
    
    const postBody = await res.json();
    console.log('Newpost',postBody);
    expect(postBody).toHaveProperty('id');
    expect(postBody.userId).toBe(1);
    expect(postBody.title).toBe('Tao post moi');
    expect(postBody.body).toBe('hello my friend');

  });

  test ('PUT-Update body', async() => {
    const res = await api.put('/posts/1',{
        data: {
            userId: 1,
            id: 1,
            title: "Update tittle",
            body: "Update body"
    }
  });
  expect (res.status()).toBe(200);
  const update = await res.json();
  console.log('Updated: ', update);
  expect(update).toHaveProperty('id');
  expect(update.userId).toBe(1);
  expect(update.title).toBe('Update tittle');
  expect(update.body).toBe('Update body');
});
test( 'Delete - Xoa post ', async () => {
    const res = await api.delete('/posts/1');
    expect (res.status()).toBe(200);
    console.log('Delete success');
  })
});