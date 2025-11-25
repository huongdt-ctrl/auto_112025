const { test, expect } = require("@playwright/test");

const baseUrl = "https://demoqa.com/alerts";
test.setTimeout(60000);
test("Click confirm pop-up", async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    // await page.waitForLoadState('load',{ timeout: 0 });
    // await page.waitForSelector('selector', { timeout: 60000 });

    

    const confirmButtonLocator = page.locator("#confirmButton");
    await confirmButtonLocator.scrollIntoViewIfNeeded();
    await confirmButtonLocator.click();
    await page.waitForTimeout(3000);
    page.once('dialog', async (event) => {
        await event.accept("Cancel");
    });

    console.log("Pop-up đã hiển thị.");
    
    await page.waitForTimeout(20000);
    
    // console.log(`Đã chấp nhận Pop-up Confirm với thông báo: ${dialog.message()}`);

    // Chờ cho kết quả hiển thị
    await expect(confirmResultLocator).toHaveText("You selected Ok");
    console.log("Kết quả xác minh thành công.");
});