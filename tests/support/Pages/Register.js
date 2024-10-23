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
    await this.page.locator(this.element.buttonCloseTour).getByLabel('Close').click()
    // await this.page.locator(this.element.secondButtonCloseTour).click()
  }

  async tableForJson() {
    const workbook = xlsx.readFile('tests/support/Table/planilhaTeste.xlsx');
  
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
    console.log(jsonData);
  
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

  async fillName(nome) {
    const alias = Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
    await this.page.locator(this.element.name).fill(nome)
  }

  async fillGtin() {
    await this.page.locator(this.element.gtin).fill('Campo com mais de treze')
  }

  async fillUnitOfMeasure(unidade_medida) {
    await this.page.locator(this.element.inputDropDown).getByRole('combobox').nth(2).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('treeitem', { name: unidade_medida, exact: true }).click();
  }

  async fillDescription(descricao) {
    const alias = Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
    await this.page.locator(this.element.description).fill(descricao)
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

      await this.save()
      await this.moreProdutct()

      await this.page.waitForTimeout(4000);
    }
  }

}

module.exports = { Register }
