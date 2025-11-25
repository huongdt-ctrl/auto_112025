const {test,expect} = require("@playwright/test");
test.setTimeout(60000);
const users = [
  { email: "giahd@nal.com",  pwd: "Logicom@1234", login_type: "web", status: 200 },
  { email: "user02@test.com", pwd: "Pass@123",    login_type: "web", status: 'API_ERROR' },
  { email: "user03@test.com", pwd: "Pass@123",    login_type: "web", status: 'API_ERROR' },
  { email: "user04@test.com", pwd: "Pass@123",    login_type: "web", status: 500 },
  { email: "user05@test.com", pwd: "Pass@123",    login_type: "web", status: 'API_ERROR' }
];

// Mock API cho từng test
test.beforeEach(async ({ page }) => {
  await page.route('**/api/scm/auth/login', async (route, request) => {
    const body = request.postDataJSON();

    const acc = users.find(u => u.email === body.email && u.pwd === body.pwd);

    if (!acc) {
      return route.fulfill({
        status: 'API_ERROR',
        body: JSON.stringify({ code: "API_ERROR", message: "User error" })
      });
    }
    if (acc.status === 'API_ERROR') {
        return route.fulfill({
          status: 400,
          body: JSON.stringify({ code: "API_ERROR", message: "Bad Requests" })
        });
      }
    if (acc.status === 500) {
      return route.fulfill({
        status: 500,
        body: JSON.stringify({ code: "500", message: "Internal Server Error" })
      });
    }

    return route.fulfill({
      status: 200,
      body: JSON.stringify({ code: "200", message: "success" })
    });
  });
});

// RUN song song 5 test
for (const user of users) {
  test(`Login Test - ${user.email} `, async ({ page }) => {
    
    await page.goto('http://logicom-cna-nal-demo-715868266.ap-northeast-1.elb.amazonaws.com/login');

    await page.getByTestId('txt_email').fill(user.email);
    await page.getByTestId('pwd_pass_word').fill(user.pwd);
    await page.getByTestId('btn_login').click();

    const response = await page.waitForResponse('**/api/scm/auth/login');
    const body = await response.json();

    // Expect theo status
     // Log beautify
     const logPass = (msg) =>
        console.log(`\x1b[32m[PASS]\x1b[0m ${user.email} → ${msg}`);
  
      const logFail = (msg) =>
        console.log(`\x1b[31m[FAIL]\x1b[0m ${user.email} → ${msg}`);
  
      // Check theo status
      try {
        if (user.status === 200) {
          expect(body.code).toBe("200");
          logPass("Login success");
        }
        else if (user.status === 'API_ERROR') {
          expect(body.code).toBe("API_ERROR");
          logPass("Bad request (expected)");
        }
        else if (user.status === 500) {
          expect(body.code).toBe("500");
          logPass("Internal Server Error (expected)");
        }
      } catch (error) {
        logFail(`Expected ${user.status} but got ${body.code}`);
        throw error; // vẫn throw để test fail đúng
      }
  
  });
}
