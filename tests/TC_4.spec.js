const { test, expect,page } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../fixtures/customerdata.json')));


test.describe('Invalid Login',async()=>{


    test('Enter the username Invalid',async ({page})=>{
        await page.goto('http://localhost:8080/parabank/');
        await page.waitForLoadState('networkidle')
  
        await page.locator("text=Log Out").click()
        await page.locator("[name='username']").fill("Test1")
        await page.locator("[name='password']").fill("Indissdf")
        await page.locator("[value='Log In']").click()
        await expect(page.locator(".error")).toHaveText("The username and password could not be verified.")
      
      })
  
});