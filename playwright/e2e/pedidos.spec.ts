import { test, expect } from '@playwright/test';

//AAA - Arrange, Act, Assert
//preparação, execução, verificação



test('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByTestId('search-order-id').fill('VLO-I2K8R6');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  //await page.getByTestId('search-order-button').click();

  //Assert
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 5000});
    //await expect(page.getByTestId('order-result-id')).toContainText('VLO-I2K8R6');

  //await expect(page.getByTestId('order-result-status')).toBeVisible();
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

  //Desafio forma 1
  await expect(page.locator("//p[text()='Pedido']/following-sibling::p")).toBeVisible({timeout: 5000});
  await expect(page.locator("//p[text()='Pedido']/following-sibling::p")).toContainText('VLO-I2K8R6');  


  await expect(page.locator("//div[text()='APROVADO']")).toBeVisible({timeout: 5000});
  await expect(page.locator("//div[text()='APROVADO']")).toContainText('APROVADO'); 

  //Desafio forma 2
  // await expect(page.getByTestId('order-result-VLO-I2K8R6')).toBeVisible({timeout: 5000});
  // await expect(page.getByTestId('order-result-VLO-I2K8R6')).toContainText('VLO-I2K8R6');

  // await expect(page.getByTestId('order-result-VLO-I2K8R6')).toBeVisible({timeout: 5000});
  // await expect(page.getByTestId('order-result-VLO-I2K8R6')).toContainText('APROVADO');

    
});