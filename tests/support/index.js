const { test: base, expect, Page } = require('@playwright/test')
const { Login } = require('./Pages/Login')
const { Register } = require('./Pages/Register')

// Extensão do teste base com o contexto da página
const test = base.extend({
  page: async ({ page }, use) => {
    // Adiciona as instâncias das operações ao contexto da página
    const context = {
      login: new Login(page),
      register: new Register(page)
    }

    // Usa o contexto com a página
    await use(Object.assign(page, context))
  }
  // ,
  // request: async ({ request }, use) => {
  //     const context = request;

  //     context['api'] = new Api(request);

  //     await context['api'].setToken();

  //     await use(context);
  // }
})

module.exports = { test, expect }
