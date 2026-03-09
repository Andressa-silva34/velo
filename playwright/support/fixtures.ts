import { test as base } from '@playwright/test';
import { createConsultarPedidoActions } from './actions/consultarPedidoActions';

type App = {
  consultarPedido: ReturnType<typeof createConsultarPedidoActions>;
};

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      consultarPedido: createConsultarPedidoActions(page),
    };
    await use(app);
  },
});

export { expect } from '@playwright/test';
