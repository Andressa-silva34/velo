import { Page, expect } from '@playwright/test';

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';


export class ConsultarPedidoPage {
  private readonly statusclasses= {
    APROVADO:   ['bg-green-100', 'text-green-700', 'lucide-circle-check-big' ],
    REPROVADO:  ['bg-red-100', 'text-red-700', 'lucide-circle-x' ],
    EM_ANALISE: ['bg-amber-100', 'text-amber-700','lucide-clock-icon']
  } as const;

  constructor(private page: Page) {}

  async buscarPedido(numero: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(numero);
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click();
  }

  async validarStatusBadge(status: OrderStatus) {
    const [bgColor, textColor, iconClass] = this.statusclasses[status];

    const statusBadge = this.page.getByRole('status').filter({ hasText: status });

    await expect(statusBadge).toHaveClass(new RegExp(bgColor));
    await expect(statusBadge).toHaveClass(new RegExp(textColor));

    await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(iconClass));
  }
}