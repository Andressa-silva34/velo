# Playwright — Actions + Fixtures: Como usar

- **Nova action:** crie `support/actions/<contexto>Actions.ts`, exporte `create<Contexto>Actions(page: Page)` retornando um objeto com métodos async.
- **Registrar na fixture:** em `support/fixtures.ts`, importe a action, adicione ao tipo `App` e no objeto `app` dentro do `extend` (ex.: `consultarPedido: createConsultarPedidoActions(page)`).
- **No teste:** importe `test` e `expect` de `../support/fixtures`; use a fixture `{ app }` e chame `app.<contexto>.<metodo>()` (ex.: `await app.consultarPedido.buscarPedido('VLO-123')`).
- **Tipos (ex. OrderDetails):** exporte do arquivo da action e importe nos specs com `import type { OrderDetails } from '../support/actions/consultarPedidoActions'`.
