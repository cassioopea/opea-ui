# Opea Design System (`opea-ui`)

Design system compartilhado pela Opea, consumido pelo **Internet Banking** (tema vinho) e pelo **Backoffice** (tema azul), e preparado para o futuro **cockpit-guardian**. Stack: React 19 + Vite + Tailwind v4 + Radix (shadcn "new-york") + CVA. Documentação viva no Storybook (`npm run storybook`).

---

## 1. Arquitetura em camadas

A dependência **flui só para baixo**. Nada importa "para cima".

```
tokens (CSS)  →  ui/ (primitivos)  →  patterns/ (domínio)  →  app
```

| Camada | Pasta | O que é | Pode importar |
| :-- | :-- | :-- | :-- |
| **Tokens** | `src/styles/` | Variáveis CSS (cor, tipografia, raio, sombra) | — |
| **Primitivos** | `src/ui/` | Blocos acessíveis, token-driven, sem domínio (Radix + CVA) | `lib/`, outros `ui/` |
| **Patterns** | `src/patterns/` | Composições de domínio (shell, tabela, drawer…) | `lib/`, `ui/`, outros `patterns/` |
| **Utilitários** | `src/lib/` | `cn`, `format` (formatação BRL/data) | — |

**Regras invioláveis:**
- Um primitivo **nunca** importa de `patterns/`.
- **Sem ciclos** de dependência.
- **Sem regra de negócio, rota, fetch ou dado específico de produto** dentro do DS. (Detecção de boleto/Pix, chamadas de API etc. vivem no app, não aqui.)
- **Sem cor/medida literal** no JSX (`#hex`, `oklch(...)`, `bg-wine-*`, `text-[13px]`). Use tokens e a escala tipográfica.
- **Componha primitivos**; não reinvente markup quando já existe um (`Input`, `Dialog`, `ToggleGroup`, `SurfaceCard`…).

---

## 2. Tokens e tematização

Três arquivos, uma regra: **a base é neutra; a marca vive nos temas.**

- `src/styles/base.css` — tokens **neutros** + mapeamento `@theme inline` (gera as utilities) + fontes + camada base. **Única fonte da base.**
- `src/styles/theme-wine.css` — `.theme-wine`: tokens de marca do IB (`--primary`, `--accent`, `--ring`, `--brand-surface*`).
- `src/styles/theme-blue.css` — `.theme-blue`: tokens de marca do Backoffice.

Uma classe de tema (`.theme-wine` / `.theme-blue`) **deve** estar no `<html>` para a marca resolver (definida em `index.html`; no Storybook, pelo toolbar de tema). `index.css` é só um shim que importa `base + temas`.

### Como adicionar um tema novo (ex.: cockpit)
1. Criar `src/styles/theme-cockpit.css` com `.theme-cockpit { --primary: …; --accent: …; --ring: …; --brand-surface: …; --brand-surface-foreground: …; }` (+ bloco `.dark, .theme-cockpit.dark`).
2. `@import "./styles/theme-cockpit.css";` em `index.css` (e adicionar ao toolbar do Storybook).
3. **Pronto. Zero mudança em componente.**

### Famílias de token principais
`--background/--foreground`, `--card/--card-foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--success`, `--warning`, `--info`, `--border/--input/--ring`, `--brand-surface/--brand-surface-foreground` (barra de menu superior / hero), `--pin-modal-*`, `--shadow-card/--shadow-elevated`. Tipografia: `text-caption/label/body/subheading/heading/title/display`.

---

## 3. Convenções de API

- **`forwardRef`** em primitivos que envolvem um elemento DOM.
- **`asChild`** (Radix `Slot`) para polimorfismo (`Button`, `SurfaceCard`) — não reinvente `<a>`/`<button>`.
- **`className` sempre mesclável via `cn(...)`** (nunca concatenação de template — quebra o `tailwind-merge`).
- **`cva`** para variação: cada eixo é uma prop nomeada pelo significado. **Variação = variante, nunca um componente novo (fork).**
- **`tone`** é o eixo semântico de cor compartilhado (`success | warning | danger | info | neutral`) — mesmo significado em `Badge` e `StatusBadge`. `variant` é para estilos estruturais (default/secondary/outline).
- Formatação só via `@/lib/format` (`formatBRL`, `formatDateBR`…); para dinheiro na UI, prefira `<MoneyText>`.

---

## 4. Como adicionar um componente

1. Decida a camada: primitivo genérico → `ui/`; composição de domínio → `patterns/`.
2. **Componha** primitivos existentes; só caia em markup cru se não houver primitivo.
3. Use tokens + escala tipográfica (zero literal). `cn()` para classes. `cva` para variantes. `forwardRef`/`asChild` quando fizer sentido.
4. Exporte no barrel da camada (`src/ui/index.ts` ou `src/patterns/index.ts`).
5. Escreva a **story** cobrindo variantes e estados, validando nos dois temas (Wine/Blue) e modos (light/dark).
6. **Não** é preciso editar componentes existentes — se for, repense.

---

## 5. Consumo

- Barrels: `import { Button } from "@/ui"` e `import { DataTable } from "@/patterns"`. Deep-import por arquivo também funciona.
- Comandos: `npm run dev` · `npm run storybook` · `npm run build` · `npm run lint`.

Mudanças de API/token são registradas em [CHANGELOG.md](CHANGELOG.md).
