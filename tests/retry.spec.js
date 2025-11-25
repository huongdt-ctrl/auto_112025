const { test, expect } = require("@playwright/test");
test.setTimeout(120000);

const users = [
  { email: "giahd@nal.vn",  pwd: "Logicom@1234", login_type: "web", status: 200 },
  { email: "user02@test.com", pwd: "Pass@123",    login_type: "web", status: 400 },
  { email: "user03@test.com", pwd: "Pass@123",    login_type: "web", status: 400 },
  { email: "user04@test.com", pwd: "Pass@123",    login_type: "web", status: 500 },
  { email: "user05@test.com", pwd: "Pass@123",    login_type: "web", status: 400 }
];

const results = [];

for (let i = 0; i < users.length; i++) {
  const user = users[i];

  test(`Login - ${user.email}_[${i}]`, async ({ page }) => {
    let attempt = 0;
    let success = false;
    let lastStatus = null;

    while (attempt < 3 && !success) {
      attempt++;
      try {
        await page.goto('http://logicom-cna-nal-demo-715868266.ap-northeast-1.elb.amazonaws.com/login');
        await page.getByTestId('txt_email').fill(user.email);
        await page.getByTestId('pwd_pass_word').fill(user.pwd);
        await page.getByTestId('btn_login').click();

        const response = await page.waitForResponse('**/api/scm/auth/login');
        const body = await response.json();

        lastStatus = response.status();
        const code = body.code;
        // console.log(`${user.email}_[${i}]`,code);

        if ((user.status === 200 && code === '200') ||
            (user.status === 400 && code === '400') ||
            (user.status === 500 && code === '500')) {
          success = true;
          results.push({ user: user.email, status: "PASS", attempts: attempt, code });
        }

      } catch (err) {
        // Không log gì, chỉ retry
      }
    }

    if (!success) {
      results.push({ user: user.email, status: "FAIL", attempts: 3, lastStatus });
    }
  });
}

test.afterAll(() => {
  console.log("\n====== LOGIN RESULTS ======");
  console.table(results);
});
