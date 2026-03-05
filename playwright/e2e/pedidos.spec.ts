import { test, expect } from '@playwright/test';
import { gerarCodigoPedido } from '../support/helpers';
import { ConsultarPedidoPage } from '../support/pages/ConsultarPedidoPage';
// AAA - Arrange, Act, Assert
// preparação, execução, verificação

test.describe('Consultar pedidos', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  });


  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-Z73OWR',
      color: 'Lunar White',
      whells: 'sport Wheels',
      customer: {
        name: 'Jorge Samuel Matheus Viana',
        email: 'jorge_samuel_viana@tribunaimpressa.com.br',
      },
      payment: 'À Vista',
      status: 'APROVADO' as const,
    };

    // Act
    const consultarPedidoPage = new ConsultarPedidoPage(page);
    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text:  ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.whells}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-ENFDON',
      color: 'Midnight Black',
      whells: 'sport Wheels',
      customer: {
        name: 'Ian Bento da Mota',
        email: 'ian_damota@br.flextronics.com',
      },
      payment: 'À Vista',
      status: 'REPROVADO' as const,
    };

    // Act
    const consultarPedidoPage = new ConsultarPedidoPage(page);
    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text:  ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.whells}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve consultar um pedido em análise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-I6NYT3',
      color: 'Glacier Blue',
      whells: 'aero Wheels',
      customer: {
        name: 'Brenda Luzia Aragão',
        email: 'brenda-aragao99@samsaraimoveis.com.br',
      },
      payment: 'À Vista',
      status: 'EM_ANALISE' as const,
    };

    // Act
    const consultarPedidoPage = new ConsultarPedidoPage(page);
    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text:  ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.whells}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = gerarCodigoPedido();

    // Act
    const consultarPedidoPage = new ConsultarPedidoPage(page);
    await consultarPedidoPage.buscarPedido(order);

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `);
  });

});