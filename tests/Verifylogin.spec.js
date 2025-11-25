const { test, expect, request } = require('@playwright/test');

const URL = 'http://logicom-cna-nal-demo-715868266.ap-northeast-1.elb.amazonaws.com/login';

test('Login xong verify', async ({ page }) => {
  //  1. Load trang
  await page.goto(URL);

  // 2.login
  await page.getByTestId('txt_email').fill('giahd@nal.vn');
  await page.getByTestId('pwd_pass_word').fill('Logicom@1234');

  // 3. Click button
  const loginBtn = page.getByTestId('btn_login');
    await expect(loginBtn).toBeEnabled({ timeout: 5000 });
    await loginBtn.click();

  // 4. Verify login bằng API
  const api = await request.newContext({ baseURL: 'http://logicom-cna-nal-demo-715868266.ap-northeast-1.elb.amazonaws.com' });

  const response = await api.post('/api/scm/auth/login', {
    data: {
      email: 'giahd@nal.vn',
      pwd: 'Logicom@1234',
      login_type: 'web'
    }
  });
//   console.log(response.json);
  
  expect(response.status()).toBe(200);

  const body = await response.json();

 
  expect(body.code).toBe('200');
  expect(body.message).toBe('success');
  expect(body.data.token).toBeTruthy();
  expect(body.data.data.userName).toBe('HOANG GIA');
  expect(body.data.data.email).toBe('giahd@nal.vn');

  console.log('Login API response:', body);

  await api.dispose(); 
});
