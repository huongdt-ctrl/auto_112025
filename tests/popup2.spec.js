const { test, expect } = require("@playwright/test");

const baseUrl = "https://demoqa.com/alerts";
// const baseUrl = "http://logicom-cna-nal-demo-715868266.ap-northeast-1.elb.amazonaws.com/login";

test.setTimeout(60000);

test("Click confirm pop-up", async ({ page }) => {
  await page.goto(baseUrl);

  const confirmButtonLocator = page.locator("#confirmButton");
  await confirmButtonLocator.scrollIntoViewIfNeeded();

 
  page.once('dialog', async (dialog) => {
    console.log(`Pop-up message: ${dialog.message()}`);
    await dialog.accept(); 
  });

  await confirmButtonLocator.click();
  console.log("Pop-up đã hiển thị.");


  const confirmResultLocator = page.locator("#confirmResult");
  await expect(confirmResultLocator).toHaveText("You selected Ok");
  console.log("Kết quả xác minh thành công.");
});
