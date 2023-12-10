const { chromium, expect,page } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../fixtures/customerdata.json')));


module.exports = async config => {
    const browser = await chromium.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(dataset.url)
    var username= "Test"+Math.floor(Math.random() * 10000);
    console.log(username)
    await page.locator("text=Register").click();
    await page.locator("[name='customer.firstName']").fill(username);
    await page.locator("[name='customer.lastName']").fill(dataset.lastname);
    await page.locator("[name='customer.address.street']").fill(dataset.streeth);
    await page.locator("[name='customer.address.city']").fill(dataset.city);
    await page.locator("[name='customer.address.state']").fill(dataset.state);
    await page.locator("[name='customer.address.zipCode']").fill(dataset.zipcode);
    await page.locator("[name='customer.phoneNumber']").fill(dataset.phonenumber)
    await page.locator("[name='customer.ssn']").fill(dataset.ssn)
    await page.locator("[name='customer.username']").fill(username)
    await page.locator("[name='customer.password']").fill(dataset.password)
    await page.locator("[name='repeatedPassword']").fill(dataset.RepeatPassword)
    await page.locator("[value='Register']").click()
    await page.context().storageState({path: "user.json"}) 
    await browser.close()
}