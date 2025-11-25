import { test, expect } from '@playwright/test';
const url = 'https://practice.automationtesting.in/shop/';
test.setTimeout(60000);

test('Test Shopping', async ({ page }) => {
  //Mua hàng
  await page.goto(url);

//   await page.locator(`a[data-product_id="169"]`).click();
//   await page.locator(`a[data-product_id="170"]`).click();

  await page.locator('a[href="/shop/?add-to-cart=169"]').click();
  await page.locator('a[href="/shop/?add-to-cart=170"]').click();
  //Chờ giỏ hàng cập nhật
  await expect(page.locator('.wpmenucart-contents .amount')).not.toHaveText('₹0.00');

  //Chuyển đến giỏ hàng
  await page.locator('.wpmenucart-contents .amount').click();
  await page.waitForLoadState('load');
  await expect(page).toHaveURL('https://practice.automationtesting.in/basket/');
  console.log("Đã direct sang giỏ hàng =>>>>>")
//   await page.waitForURL('https://practice.automationtesting.in/basket/');

  //Chờ bảng giỏ hàng xuất hiện
  await page.waitForSelector('table.shop_table');


  //Kiểm tra sản phẩm

//  //Kiểm tra sản phẩm 2
  await expect(
    page.locator('td.product-name a'),{ hasText: 'Functional Programming in JS' }) 
  .toBeVisible();
  //Kiểm tra sản phẩm 1
  await expect(
    page.locator('td.product-name a'),{ hasText: 'Android Quick Start Guide' }).toBeVisible();  
    console.log("Sản phẩm đã có trong giỏ hàng")
});    
