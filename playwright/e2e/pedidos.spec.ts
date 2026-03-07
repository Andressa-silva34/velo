import { test } from '@playwright/test';
import { gerarCodigoPedido } from '../support/helpers';
import { NavbarComponent } from '../support/components/NavbarComponent';
import { HomePage } from '../support/pages/HomePage';
import { ConsultarPedidoPage, OrderDetails } from '../support/pages/ConsultarPedidoPage';
// AAA - Arrange, Act, Assert
// preparação, execução, verificação

test.describe('Consultar pedidos', () => {
  let consultarPedidoPage: ConsultarPedidoPage;

  test.beforeEach(async ({ page }) => {
    // Arrange - home
    await new HomePage(page).irParaHome();
    await new NavbarComponent(page).irParaConsultarPedido();
    consultarPedidoPage = new ConsultarPedidoPage(page);
    await consultarPedidoPage.validarQueEstaNaPagina();
  });


  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-Z73OWR',
      color: 'Lunar White',
      whells: 'sport Wheels',
      customer: {
        name: 'Jorge Samuel Matheus Viana',
        email: 'jorge_samuel_viana@tribunaimpressa.com.br',
      },
      payment: 'À Vista',
      status: 'APROVADO',
    };

    // Act
    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await consultarPedidoPage.validarDetalhesDoPedido(order);
    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-ENFDON',
      color: 'Midnight Black',
      whells: 'sport Wheels',
      customer: {
        name: 'Ian Bento da Mota',
        email: 'ian_damota@br.flextronics.com',
      },
      payment: 'À Vista',
      status: 'REPROVADO',
    };

    // Act
    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await consultarPedidoPage.validarDetalhesDoPedido(order);
    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve consultar um pedido em análise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-I6NYT3',
      color: 'Glacier Blue',
      whells: 'aero Wheels',
      customer: {
        name: 'Brenda Luzia Aragão',
        email: 'brenda-aragao99@samsaraimoveis.com.br',
      },
      payment: 'À Vista',
      status: 'EM_ANALISE',
    };

    // Act

    await consultarPedidoPage.buscarPedido(order.number);

    // Assert
    await consultarPedidoPage.validarDetalhesDoPedido(order);
    await consultarPedidoPage.validarStatusBadge(order.status);
  });


  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = gerarCodigoPedido();

    // Act
    await consultarPedidoPage.buscarPedido(order);

    // Assert
    await consultarPedidoPage.validarPedidoNaoEncontrado();
  });


  test('Deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {

    const codigoForaDoPadrao = 'XXX-12345';

    // Act
    await consultarPedidoPage.buscarPedido(codigoForaDoPadrao);

    // Assert
    await consultarPedidoPage.validarPedidoNaoEncontrado();
  });

});