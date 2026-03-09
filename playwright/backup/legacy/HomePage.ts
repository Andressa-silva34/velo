import { Page, expect } from '@playwright/test';


export class HomePage {
  constructor(private page: Page) {}

  async irParaHome() {
    await this.page.goto('/');
    const titulo = this.page.getByTestId('hero-section').getByRole('heading');
    await expect(titulo).toContainText('Velô Sprint');  }
 }
