const { test, expect } = require("@playwright/test");

const URL = "https://demoqa.com/browser-windows";

test.setTimeout(60000);

test('Test mở tab mới', async ({ browser }) => {
  // Tạo context và page
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(URL);

  const [newTab] = await Promise.all([
    context.waitForEvent('page'), 
    page.click('#tabButton')      
  ]);

  // Chờ tab mới load xong
  await newTab.waitForLoadState();

  console.log("URL tab mới:", newTab.url());

  // Kiểm tra nội dung tab mới
  const headingText = await newTab.locator('h1').textContent();
  console.log("Nội dung tab mới:", headingText);

  // Quay lại tab cũ
  await page.bringToFront();
  console.log("Đã quay lại tab gốc.");
});
