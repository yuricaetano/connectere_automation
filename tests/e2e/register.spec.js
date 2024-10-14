const { test } = require('../support/index')

test.setTimeout(200000); 

const data = {
  emailValid: 'yuri@connectere.agr.br',
  passwordValid: '123456'
}

test.describe('Cadastrar produto', () => {
  test.beforeEach(async ({ page }) => {
    await page.login.visit()
  })

  test('Fazer login', async ({ page }) => {
    await page.login.fillEmail(data.emailValid)
    await page.login.fillPassword(data.passwordValid)
    await page.login.clickButtonEnter()
    await page.register.tableForJson()
    await page.register.closeTour()
    await page.register.fillFormFromJson()
  })

})