const { expect } = require('@playwright/test')

class Login {
  constructor(page) {
    this.page = page
  }

  data = {
    path: '/produtos/new'
  }

  element = {
    inputEmail: '#usuario_email',
    inputPassword: '#usuario_password',
    buttonEnter: '#button-login',
  }

  async visit() {
    await this.page.goto('./' + this.data.path)
    await this.page.waitForLoadState('load')
  }

  async fillEmail(email) {
    await this.page.locator(this.element.inputEmail).fill(email)
  }

  async fillPassword(password) {
    await this.page.locator(this.element.inputPassword).fill(password)
  }

  async clickButtonEnter() {
    await this.page.locator(this.element.buttonEnter).click()
  }

}

module.exports = { Login }
