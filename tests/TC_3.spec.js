const { test, expect,page } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../fixtures/customerdata.json')));
const paydataset = JSON.parse(JSON.stringify(require('../fixtures/payeedata.json')));

test.describe("AC-03 Testcase of Bill payee",async()=>{

    let beforeAccountno =[]
    let beforeBlance =[]
    let beforeAvailablebalance=[]
    let AfterTransferAccount =[]
    let AfterBeforeBalance= []
    let AfterAvailableBalance=[]

    test('AC-03-01 Bill Pay and verify account balance zero',async({page})=>{ 
      await page.goto(dataset.url);
      await page.locator("#leftPanel").locator("text=Bill Pay").click()
      await page.locator("#leftPanel").locator("text=Accounts Overview").click()
      const rows = await page.locator("#accountTable tbody tr")
      for(let i=0; i<await rows.count(); i++){
        const acc = await rows.nth(i).locator("td").nth(0).textContent();
        const beforeacc = await rows.nth(i).locator("td").nth(1).textContent();
        const availacc = await rows.nth(i).locator("td").nth(2).textContent();
        beforeAccountno.push(acc)
        beforeBlance.push(beforeacc)
        beforeAvailablebalance.push(availacc)
        }
        await page.locator("text=Bill Pay").click()
        await page.locator("[name='payee.name']").fill(paydataset.Payeename);
        await page.locator("[name='payee.address.street']").fill(paydataset.Streeth)
        await page.locator("[name='payee.address.city']").fill(paydataset.city)
        await page.locator("[name='payee.address.state']").fill(paydataset.state)
        await page.locator("[name='payee.address.zipCode']").fill(paydataset.zipCode)
        await page.locator("[name='payee.phoneNumber']").fill(paydataset.phoneNumber)
        await page.locator("[name='payee.accountNumber']").fill(beforeAccountno[1])
        await page.locator("[name='verifyAccount']").fill(beforeAccountno[1])
        await page.locator("[name='amount']").fill(beforeBlance[0].slice(1).replace(",",""))
        await page.locator("[name='fromAccountId']").selectOption({label : beforeAccountno[0]})
        await page.locator("[value='Send Payment']").click()
        await expect(page.locator("#rightPanel").locator(".title").nth(1)).toHaveText("Bill Payment Complete")
        await page.locator("#leftPanel").locator("text=Accounts Overview").click()
        await page.locator("#leftPanel").locator("text=Accounts Overview").click()
       for(let j=0; j<await rows.count(); j++){
        const AfterAccount = await rows.nth(j).locator("td").nth(0).textContent();
        const afterbale = await rows.nth(j).locator("td").nth(1).textContent();
        const aftervailacc = await rows.nth(j).locator("td").nth(2).textContent();
        AfterTransferAccount.push(AfterAccount)
        AfterBeforeBalance.push(afterbale)
        AfterAvailableBalance.push(aftervailacc)
        }
      
        console.log(beforeAccountno[0])
        console.log("Account No: ",beforeAccountno[0])
        console.log("Before Available: ",beforeBlance[0].slice(1))
        console.log("Available Balance: ",beforeAvailablebalance[0].slice(1))
        console.log("Account No Transfer",AfterTransferAccount[1])
        console.log("Account No: ",AfterTransferAccount[0])
        console.log("After Transer Balance Available: ",AfterBeforeBalance[0].slice(1))
        console.log("After Transfer Available Balance: ",AfterAvailableBalance[0].slice(1))
       
        expect(AfterBeforeBalance[0].slice(1)).toContain("0.00")
        expect(AfterAvailableBalance[0].slice(1)).toContain("0.00")
      
      })
      



    test('AC-03-02 Bill Pay with more than available balance and verify restrict message',async({page})=>{ 
      await page.goto(dataset.url);
      await page.locator("#leftPanel").locator("text=Bill Pay").click()
      await page.locator("#leftPanel").locator("text=Accounts Overview").click()
      const rows = await page.locator("#accountTable tbody tr")
      for(let i=0; i<await rows.count(); i++){
        const beforeaccount = await rows.nth(i).locator("td").nth(0).textContent();
        const beforeacc = await rows.nth(i).locator("td").nth(1).textContent();
        const availacc = await rows.nth(i).locator("td").nth(2).textContent();
        beforeAccountno.push(beforeaccount)
        beforeBlance.push(beforeacc)
        beforeAvailablebalance.push(availacc)
        }
        await page.locator("text=Bill Pay").click()
        await page.locator("[name='payee.name']").fill(paydataset.Payeename);
        await page.locator("[name='payee.address.street']").fill(paydataset.Streeth)
        await page.locator("[name='payee.address.city']").fill(paydataset.city)
        await page.locator("[name='payee.address.state']").fill(paydataset.state)
        await page.locator("[name='payee.address.zipCode']").fill(paydataset.zipCode)
        await page.locator("[name='payee.phoneNumber']").fill(paydataset.phoneNumber)
        await page.locator("[name='payee.accountNumber']").fill(beforeAccountno[1])
        await page.locator("[name='verifyAccount']").fill(beforeAccountno[1])
        await page.locator("[name='amount']").fill(paydataset.HighAmount)
        await page.locator("[name='fromAccountId']").selectOption({label : beforeAccountno[2]})
        await page.locator("[value='Send Payment']").click()
        await expect(page.locator("#rightPanel").locator(".title").nth(1)).toHaveText("You can not pay more than balance in your account")
  
      })
  
    })
