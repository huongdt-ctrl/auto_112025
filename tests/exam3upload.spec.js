const { test, expect } = require("@playwright/test");
// Giả định tệp của bạn nằm ở './test-data/sampleFile.jpeg'
const FILE_PATH = '/Users/giahd/Downloads/testdata/sampleFile.jpeg'; 
const URL = "https://demoqa.com/upload-download";

test("Test uploadFIle", async ({page}) => {
    // B1: Truy cập trang web
    await page.goto(URL);
    
    // B2: Upload file
    await page.setInputFiles('#uploadFile', FILE_PATH);
    
    // B3: Xác nhận tệp đã được tải thành công
    await expect(page.locator('#uploadedFilePath')).toHaveText(
        `C:\\fakepath\\sampleFile.jpeg`
    );
    
    console.log("Upfile thanh cong");
})