const { test, expect,page } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../fixtures/customerdata.json')));


test.describe("AC-02 Request Loan Testcase",async()=>{


    test('AC-02-01 Approved Loan with Less downpayment and more loan amount',async({page})=>{ 
      await page.goto(dataset.url);
      await page.locator("#leftPanel").locator("text=Request Loan").click()
      await page.locator("#amount").fill("5000")
      await page.locator("#downPayment").fill("1000")
      await page.locator("[value='Apply Now']").click()
      await expect(page.locator("#loanStatus")).toHaveText("Approved")

    })

    test('AC-02-02 Denied Loan with More Downpayment and less loan amount',async({page})=>{ 
        await page.goto(dataset.url);
        await page.locator("#leftPanel").locator("text=Request Loan").click()
        await page.locator("#amount").fill("1000")
        await page.locator("#downPayment").fill("7000")
        await page.locator("[value='Apply Now']").click()
        await expect(page.locator("#loanStatus")).toHaveText("denied")
  
      })
})
  
  
