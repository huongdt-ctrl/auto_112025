// google.spec.js

// Import các đối tượng cần thiết từ Playwright
const { test, expect } = require('@playwright/test');

// Định nghĩa test case. 'page' là đối tượng chính để tương tác với trình duyệt.
test('Kiểm tra tiêu đề trang chủ Google', async ({ page }) => {

    // 1. Hành động (Act): Điều hướng đến trang web
    console.log('Điều hướng đến Google...');
    await page.goto('https://www.google.com/');

    // 2. Kiểm tra (Assert): Khẳng định rằng tiêu đề trang chứa chuỗi "Google"
    console.log('Kiểm tra tiêu đề trang...');
    // expect(page) là đối tượng trang, .toHaveTitle() là một assertion (khẳng định)
    await expect(page).toHaveTitle(/Google/);

    console.log('Test case thành công!');
});