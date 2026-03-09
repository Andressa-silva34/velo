import { test, expect } from '../support/fixtures';
import { gerarCodigoPedido } from '../support/helpers';
import type { OrderDetails } from '../support/actions/consultarPedidoActions';

test.describe('Consultar pedidos', () => {
  test.beforeEach(async ({ app }) => {
    await app.consultarPedido.abrirPaginaVelo();
  });

  test('deve consultar um pedido aprovado', async ({ app }) => {
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

    await app.consultarPedido.buscarPedido(order.number);

    await app.consultarPedido.validarDetalhesDoPedido(order);
    await app.consultarPedido.validarStatusBadge(order.status);
  });

  test('Deve consultar um pedido reprovado', async ({ app }) => {
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

    await app.consultarPedido.buscarPedido(order.number);

    await app.consultarPedido.validarDetalhesDoPedido(order);
    await app.consultarPedido.validarStatusBadge(order.status);
  });

  test('Deve consultar um pedido em análise', async ({ app }) => {
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

    await app.consultarPedido.buscarPedido(order.number);

    await app.consultarPedido.validarDetalhesDoPedido(order);
    await app.consultarPedido.validarStatusBadge(order.status);
  });

  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = gerarCodigoPedido();

    await app.consultarPedido.buscarPedido(order);

    await app.consultarPedido.validarPedidoNaoEncontrado();
  });

  test('Deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const codigoForaDoPadrao = 'XXX-12345';

    await app.consultarPedido.buscarPedido(codigoForaDoPadrao);

    await app.consultarPedido.validarPedidoNaoEncontrado();
  });
});
