import { Page, expect } from '@playwright/test';

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';

export type OrderDetails ={
  number: string;
  color: string;
  whells: string;
  customer: { name: string; email: string };
  payment: string;
  status: OrderStatus;
}

export class ConsultarPedidoPage {
 
  constructor(private page: Page) {}

  async validarQueEstaNaPagina() {
    await expect(this.page.getByRole('heading')).toContainText('Consultar Pedido');
  }

  async buscarPedido(numero: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(numero);
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click();
  }

  async validarDetalhesDoPedido(order: OrderDetails) {
    const snapshot = `
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
`;
    const locator = this.page.getByTestId(`order-result-${order.number}`);
    await expect(locator).toMatchAriaSnapshot(snapshot);
  }

  async validarPedidoNaoEncontrado() {
    const snapshot = `
  - img
  - heading "Pedido não encontrado" [level=3]
  - paragraph: Verifique o número do pedido e tente novamente
`;
    await expect(this.page.locator('#root')).toMatchAriaSnapshot(snapshot);
  }

  async validarStatusBadge(status: OrderStatus) {
    const statusclasses = {
      APROVADO:   {
        bgColor: 'bg-green-100', 
        textColor: 'text-green-700',
        iconClass: 'lucide-circle-check-big',
      },
      REPROVADO: {
        bgColor: 'bg-red-100', 
        textColor: 'text-red-700', 
        iconClass: 'lucide-circle-x',
      },
      EM_ANALISE: {
        bgColor: 'bg-amber-100', 
        textColor: 'text-amber-700',
        iconClass: 'lucide-clock-icon',
      }
    } as const;


    const classes= statusclasses[status];

    const statusBadge = this.page.getByRole('status').filter({ hasText: status });

    await expect(statusBadge).toHaveClass(new RegExp(classes.bgColor));
    await expect(statusBadge).toHaveClass(new RegExp(classes.textColor));

    await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(classes.iconClass));
  }
}