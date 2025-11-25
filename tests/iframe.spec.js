const {test,expect} = require("@playwright/test");

const URL = "https://demoqa.com/frames"
test.setTimeout(60000);

test ('Test iframe',async({page}) => {
    await page.goto(URL);
    // lay frame
    const frame1 = page.frame({name: 'frame1'});
    const heading = await frame1.locator('#sampleHeading').textContent();
    console.log('Text Frame: ',heading);
    await expect(frame1.locator('#sampleHeading')).toHaveText('This is a sample page');
});