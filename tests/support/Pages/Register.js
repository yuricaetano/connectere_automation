const { expect } = require('@playwright/test')
const fs = require('fs')
const xlsx = require('xlsx')

class Register {
  constructor(page) {
    this.page = page
    this.data = JSON.parse(fs.readFileSync('tests/support/Table/dados.json', 'utf-8'));
  }

  element = {
    buttonCloseTour: '#modal_onboarding',
    secondButtonCloseTour: 'button[class="close modal__close"]',
    inputDropDown: '#produto_form',
    name: "#produto_nome",
    gtin: '#produto_ean',
    description: '#produto_descricao',
    saveButton: '#js-submit',
    moreProdutct: 'a[class="btn btn--medium btn--is-green"]'
  }

  async closeTour() {
    await this.page.locator(this.element.buttonCloseTour).getByLabel('Close').dblclick()
    // await this.page.locator(this.element.secondButtonCloseTour).click()
  }

  async tableForJson() {
    const workbook = xlsx.readFile('tests/support/Table/planilhaTeste.xlsx');
  
    // Selecionar a primeira aba da planilha (ou especifique a aba pelo nome)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Converter os dados da planilha para JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
    // Exibir os dados no console (opcional)
    console.log(jsonData);
  
    // Salvar o JSON em um arquivo (opcional)
    fs.writeFileSync('tests/support/Table/dados.json', JSON.stringify(jsonData, null, 2));
  }

  async fillManufacturer(fabricante) {
    await this.page.locator(this.element.inputDropDown).getByRole('combobox').nth(0).click();
    await this.page.getByRole('treeitem', { name: fabricante }).click();
  }

  async fillFamily(familia) {
    await this.page.locator(this.element.inputDropDown).getByRole('combobox').nth(1).click();
    await this.page.getByRole('treeitem', { name: familia }).click();
  }

  async fillName() {
    const alias = Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
    await this.page.locator(this.element.name).fill('teste' + alias)
  }

  async fillGtin() {
    await this.page.locator(this.element.gtin).fill('Campo com mais de treze')
  }

  async fillUnitOfMeasure(unidade_medida) {
    await this.page.locator(this.element.inputDropDown).getByRole('combobox').nth(2).click();
    await this.page.getByRole('treeitem', { name: unidade_medida,  exact: true  }).click();
  }

  async fillDescription() {
    await this.page.locator(this.element.description).fill('Teste')
  }

  async save() {
    await this.page.locator(this.element.saveButton).nth(0).click()
    await this.page.waitForLoadState('load')
  }

  async moreProdutct() {
    await this.page.locator(this.element.moreProdutct).click()
    await this.page.waitForLoadState('load')
  }

  async fillFormFromJson() {
    for (const produto of this.data) {
      await this.fillManufacturer(produto.fabricante)
      await this.fillFamily(produto.familia)
      await this.fillName(produto.nome)
      await this.fillUnitOfMeasure(produto.unidade_medida)
      await this.fillDescription(produto.descricao)

      // Salvar o formulário
      await this.save()
      await this.moreProdutct()

      // Adicionar um tempo de espera entre submissões (opcional)
      await this.page.waitForTimeout(1000);
    }
  }

}

module.exports = { Register }
// await page.goto('https://staging.connectere.agr.br/usuarios/sign_in');
//     await page.getByLabel('E-mail').click();
//     await page.getByLabel('E-mail').fill('y');
//     await page.getByLabel('E-mail').click();
//     await page.getByLabel('E-mail').fill('yuri@connectere.agr.br');
//     await page.getByLabel('E-mail').press('Tab');
//     await page.getByLabel('Senha').fill('123456');
//     await page.getByRole('button', { name: 'Entrar' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await page.locator('#produto_form').getByRole('combobox').first().click();
//     await page.getByRole('treeitem', { name: 'CBT' }).click();
//     await page.locator('#produto_form').getByRole('combobox').nth(1).click();
//     await page.getByRole('treeitem', { name: 'COMBUSTÍVEIS (Materiais)' }).click();
//     await page.getByRole('textbox', { name: '* Nome' }).click();
//     await page.getByRole('textbox', { name: '* Nome' }).click();
//     await page.getByRole('textbox', { name: '* Nome' }).fill('teste');
//     await page.getByLabel('GTIN').click();
//     await page.getByLabel('GTIN').fill('teset');
//     await page.locator('.col-lg-2 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').first().click();
//     await page.getByLabel('', { exact: true }).first().click();
//     await page.getByRole('treeitem', { name: 'Unidade' }).click();
//     await page.getByLabel('', { exact: true }).first().click();
//     await page.getByRole('treeitem', { name: '1 mil Sementes' }).click();