const {test,expect} = require("@playwright/test");

const URL = "https://demoqa.com/dynamic-properties";
test.setTimeout(60000);

test('test auto waits', async ({page}) =>  {
    await page.goto(URL);   
    const enableButton = page.locator('#enableAfter');
    enableButton.click();
    console.log('Click button khi enable')

    const colorBtn = page.locator('#colorChange');
    await colorBtn.waitFor({ state: 'visible'});
    console.log(" Explicit wait: Nút đổi màu hiển thị.");

    await expect(colorBtn).toHaveClass(/text-danger/);
    console.log("BUTTON DỔI MÀU")
    await page.waitForTimeout(2000);
});