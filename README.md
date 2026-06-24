# opea-ui

Design system da Opea — primitivos acessíveis (Radix + Tailwind v4 + CVA) e patterns de domínio, consumidos pelo **Internet Banking** (tema vinho) e pelo **Backoffice** (tema azul).

## Comandos

```bash
npm run storybook   # catálogo vivo (principal forma de explorar o DS)
npm run dev         # app de desenvolvimento
npm run build       # type-check + build de produção
npm run lint        # oxlint
```

## Estrutura

```
src/
  styles/     tokens: base.css (neutro) + theme-wine.css + theme-blue.css
  ui/         primitivos (barrel em ui/index.ts)
  patterns/   composições de domínio (barrel em patterns/index.ts)
  lib/        cn (utils) + format (BRL/datas)
```

## Documentação

- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — arquitetura, camadas, tokens, convenções de API, como adicionar componente/tema.
- [AGENTS.md](AGENTS.md) — regras para contribuição (humana ou IA).
- [CHANGELOG.md](CHANGELOG.md) — mudanças de API e tokens.
