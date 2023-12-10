const { test, expect,page } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../fixtures/customerdata.json')));


test.describe("AC-01 Account TestCase",async()=>{
  var account =[]

test('AC-01-01 Create 3 account Details',async ({page})=>{
  await page.goto(dataset.url);
  await page.waitForLoadState('networkidle')
  await page.locator("#leftPanel").locator("text=Open New Account").click()
  await expect(page.locator(".title")).toHaveText("Open New Account")
  var accno = await page.locator("select#fromAccountId option").nth(0).textContent()
  console.log("Default Account No",accno)
  account.push(accno);
  console.log(account);
    for(let i=0 ;i<3;i++){
      await page.locator("[type='submit']").click()
      var newAccountNo= await page.locator("#newAccountId").textContent()
      console.log(newAccountNo)
      account.push(newAccountNo);
      console.log(account);
      await page.locator("text=Open New Account").click({force:true})
    }
    
    //expect(account.length).toBe(4)
    
    })

    test('AC-01-02 Verify amount After Creating 3 accoun',async({page})=>{
      await page.goto(dataset.url);
      await page.waitForLoadState('networkidle')
      await page.locator("#leftPanel").locator("text=Accounts Overview").click()
      var total = await page.locator("#accountTable tbody tr").last().locator('td').nth(1).textContent()
      console.log(total)
      var totalfinal = total?.split('$')[1]
      console.log(total?.split('$')[1])
     expect(totalfinal).toBe("3500,000.00")
      
    })

    test('AC-01-03 Transfer Fund to Same Account',async({page})=>{
      await page.goto(dataset.url);
      await page.waitForLoadState('networkidle')
      await page.locator("#leftPanel").locator("text=Transfer Funds").click()
      await page.locator("#amount").fill(dataset.LessAmount)
      await page.locator("#fromAccountId").selectOption({index:2})
      await page.locator("#toAccountId").selectOption({index:2})
      await page.locator("[value='Transfer']").click()
      await expect(page.locator(".title")).toHaveText("You can not transfer the amount to same account.")
    
    })
    
    test('AC-01-04 Transfer fund transfer more than Account Balance',async({page})=>{
      await page.goto(dataset.url);
      await page.waitForLoadState('networkidle')
      await page.locator("#leftPanel").locator("text=Transfer Funds").click()
      await page.locator("#amount").fill(dataset.Higheramount)
      await page.locator("#fromAccountId").selectOption({index:1})
      await page.locator("#toAccountId").selectOption({index:2})
      await page.locator("[value='Transfer']").click()
      await expect(page.locator(".title")).toHaveText("You can not transfer more than the balance in your account")
   
    })



})