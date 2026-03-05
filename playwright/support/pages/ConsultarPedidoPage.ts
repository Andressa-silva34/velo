import { Page, expect } from '@playwright/test';

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';


export class ConsultarPedidoPage {
 
  constructor(private page: Page) {}

  async buscarPedido(numero: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(numero);
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click();
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