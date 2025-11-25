
const { test, expect } = require('@playwright/test'); 

// Khai báo các biến hằng số 
const USERNAME = 'giahd@nal.vn';
const PASSWORD = 'Logicom@1234';
const LOGIN_URL = 'http://logicom-cna-nal-develop-3-347579451.ap-northeast-1.elb.amazonaws.com/login';

test("Test case login thanh cong", async({ page }) => {
    
    // 1.Điều hướng đến trang web
    console.log("Truy cập trang web...");
    await page.goto(LOGIN_URL);

    // 2.Điền Email và Mật khẩu bằng getByTestId
    // Điền Email
    await page.getByTestId('txt_email').fill(USERNAME);
    
    // Điền Mật khẩu
    await page.getByTestId('pwd_pass_word').fill(PASSWORD); 
    
    console.log("Đã điền thông tin đăng nhập.");
    
    // 3.Click nút Đăng nhập 
    await page.getByTestId('btn_login').click(); 
    
    console.log("Đã click nút Đăng nhập.");
    
    // 4.Xác nhận đăng nhập thành công
    await expect(page).not.toHaveURL(/login/);

    console.log("Đăng nhập thành công.");
});