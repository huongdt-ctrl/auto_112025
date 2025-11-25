const { test, expect } = require('@playwright/test');

const URL = 'https://demoqa.com/upload-download';

test('Kiểm tra download thành công', async ({ page }) => {
  await page.goto(URL);

  // Chờ sự kiện download khi nhấn nút
  const [download] = await Promise.all([
    page.waitForEvent('download'), // chờ download bắt đầu
    page.click('#downloadButton')   // nhấn nút download theo id
  ]);
  const filename = download.suggestedFilename();
  // Kiểm tra file đã tải thành công
  const path = await download.path();
  expect(path).not.toBeNull();

  console.log('Download thành công:', filename);
});
