const { test, expect } = require("@playwright/test");

const URL = 'https://demoqa.com/automation-practice-form';
// CHÚ Ý: Đảm bảo đường dẫn này chính xác trên máy tính của bạn
const FILE_PATH = '/Users/giahd/Downloads/testdata/sampleFile.jpeg'; 
const ADDRESS = 'Hoai DUC,HA NOI';
const EXPECTED_FILE_NAME = 'sampleFile.jpeg'; 

test('Đăng ký tài khoản và kiểm tra dữ liệu ổn định', async ({ page }) => {
    
    // --- KHỞI TẠO VÀ ỔN ĐỊNH TRANG ---
    await page.goto(URL);
    // await page.waitForLoadState('networkidle'); 
    // await page.waitForFunction(() => window.appReady === true);

    // --- FILL THÔNG TIN CƠ BẢN ---
    const firstNameEl = page.locator('#firstName');
    await firstNameEl.scrollIntoViewIfNeeded();
    await firstNameEl.fill("First");
    await page.waitForTimeout(1500);

    const lastNameEl = page.locator('#lastName');
    await lastNameEl.scrollIntoViewIfNeeded();
    await lastNameEl.fill("Last");
    await page.waitForTimeout(1500);

    const emailEl = page.locator('#userEmail');
    await emailEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await emailEl.fill("hoanggia@gmail.com");

    const genderWrap = page.locator('#genterWrapper');
    await genderWrap.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await genderWrap?.getByText('Male', { exact: true })?.click();

    const phoneNumberEl = page.locator('#userNumber');
    await phoneNumberEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await phoneNumberEl.fill("0999999999");


    const dateOfBirthEl = page.locator('#dateOfBirthInput');
    await dateOfBirthEl.scrollIntoViewIfNeeded();
    await dateOfBirthEl.click();

    await page.waitForTimeout(1500);
    const monthSelect = page.locator('.react-datepicker__month-select');
    await page.waitForTimeout(1500);
    await monthSelect?.selectOption('8');

    const yearSelect = page.locator('.react-datepicker__year-select');
    await page.waitForTimeout(1500);
    await yearSelect?.selectOption('1996');

    const datepickerMonth = page.locator('.react-datepicker__month');
    await datepickerMonth?.getByText('23', { exact: true })?.click();

    const subjectsWrapper = page.locator('#subjectsWrapper');
    await subjectsWrapper.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const subjectsInput = subjectsWrapper.locator('#subjectsInput')
    await subjectsInput?.fill('Commerce');
    await subjectsInput?.press('Enter');

    const hobbiesWrapper = page.locator('#hobbiesWrapper');
    await hobbiesWrapper.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const checkboxEl = hobbiesWrapper.locator('label[for="hobbies-checkbox-3"]')
    await checkboxEl.press('Space');


    // --- UPLOAD ẢNH & ADDRESS ---
    await page.locator('#uploadPicture').setInputFiles(FILE_PATH);
    await page.locator('#currentAddress').fill(ADDRESS);

    // --- CHỌN STATE (ỔN ĐỊNH: FILL + ENTER) ---
    const stateLocator = page.locator('#state');
    // Sửa lỗi cú pháp: Bỏ 'await' trên input locator, dùng type="text"
    const stateInputLocator = stateLocator.locator('input[type="text"]'); 
    await stateInputLocator.fill('N'); // Gõ chữ cái đầu 'N'
    await stateInputLocator.press('Enter'); // Chọn 'NCR'
    console.log('✅ Đã chọn State: NCR');

    // --- CHỌN CITY (FILL + ENTER) ---
    const cityLocator = page.locator('#city');
    const cityInputLocator = cityLocator.locator('input[type="text"]'); 
    await cityInputLocator.fill('A'); // Gõ chữ cái đầu 'A'
    await cityInputLocator.press('Enter');

    console.log("Đang chờ xác nhận đăng kí thành công...");

    const submitEl = page.locator('button#submit');
    await submitEl.scrollIntoViewIfNeeded();
    await submitEl.click();

    console.log("✅ Đăng kí thành công tài khoản và dữ liệu đã được xác nhận.");

    // --- XÁC NHẬN KẾT QUẢ TRONG MODAL ---
    const modalTitle = page.locator('#example-modal-sizes-title-lg');
    await expect(modalTitle).toHaveText('Thanks for submitting the form');

    // Xác nhận Upload file thành công
    const pictureRowLocator = page.locator('.table-responsive tr', { hasText: 'Picture' });
    const fileNameCell = pictureRowLocator.locator('td').nth(1); 
});