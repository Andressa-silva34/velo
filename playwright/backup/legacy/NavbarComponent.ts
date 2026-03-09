import { Page } from '@playwright/test';

export class NavbarComponent {
  constructor(private page: Page) {}

  async irParaConsultarPedido() {
    await this.page.getByRole('link', { name: 'Consultar Pedido' }).click();
  }
}
