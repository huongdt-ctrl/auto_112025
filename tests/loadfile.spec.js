const { test, expect } = require ("@playwright/test");
const fs = require('fs');
const path = require('path');

const URL = "https://the-internet.herokuapp.com/login";
// Giả định tệp configtk.json nằm đúng ở đường dẫn này
const dataPath = path.join(__dirname,'/configtk.json');
const testData = JSON.parse(fs.readFileSync(dataPath,'utf-8'));

testData.forEach((data, idx)=>{
    // LỖI ĐÃ SỬA: Dùng backtick (`) và cú pháp ${}
    test(`Kiem tra nguoi dung: ${data.username}_${idx}`, async ({page})=>{
        await page.goto(URL);
        
        // SỬA: Dùng selector ID (#username) thay vì getByTestId (vì trang demo không có data-testid)
        await page.fill('#username', data.username); 
        await page.fill('#password', data.password);
        
        await page.click('button[type="submit"]');

        // Bổ sung bước xác minh (expect) để test có ý nghĩa
        await expect(page.locator('#flash')).toBeVisible();
        console.log(`Đã login tài khoản: ${data.username}_${idx}`);
});
test.afterEach(async ({ page }) => {
    // Hành động: Nếu test thành công, thực hiện Đăng xuất để dọn dẹp phiên
    // Nếu test thất bại (vẫn ở trang login), không cần làm gì.
    
    // Kiểm tra xem có nút Logout không (chỉ có trên trang secure area)
    const logoutButton = page.locator('.button.secondary.radius');
    
    if (await logoutButton.isVisible()) {
        await logoutButton.click();
        await expect(page).toHaveURL(/login/);
        console.log(`Đã thực hiện Đăng xuất thành công.`);
    }
});
})    