# DS-PLANO-REFATORACAO — `opea-ui` (Fase 1, proposta)

> Plano de execução do **Top 10** do [DS-AUDITORIA-ARQUITETURA.md](DS-AUDITORIA-ARQUITETURA.md). Nada será editado até a aprovação deste plano. A execução (Fase 2) acontece em **blocos revisáveis**, com `build` + `lint` + `type-check` verdes e **parada/reporte ao fim de cada bloco**. Sem push, sem mexer em `main`.
>
> **Princípio-mestre de ordem:** tokens destravam tema; composição destrava consistência visual; API/barrels fecham a superfície pública. Por isso: **Bloco A (tokens) → B (pureza de domínio) → C (composição) → D (API/varredura) → E (barrels/docs)**.
>
> **Convenção de risco:**
> - 🟢 **Aditivo** — não quebra consumidor (IB/Backoffice ainda nem consomem; mesmo assim, registrado).
> - 🟡 **Mudança interna** — muda implementação/markup, API pública estável.
> - 🔴 **Muda API pública** — exige entrada no `CHANGELOG.md` + caminho de migração.

---

## Visão geral dos blocos

| Bloco | Tema | Itens Top 10 | Risco | Commits previstos |
| :-: | :-- | :-- | :-: | :-: |
| **A** | Tokens & tematização | #1, #2 | 🟡/🔴 | 3 |
| **B** | Pureza de domínio | #3 | 🔴 | 1 |
| **C** | Composição (patterns compõem primitivos) | #4, #5 | 🔴 | 4 |
| **D** | Consistência de API + varredura mecânica | #6, #7, #8 | 🟡/🔴 | 3 |
| **E** | Superfície pública & docs | #9, #10 | 🟢 | 2 |

Cada bloco abaixo: **objetivo · arquivos · passos · risco · prova (story/verificação) · ordem interna**.

---

## BLOCO A — Tokens & tematização (Top 10 #1 e #2)

**Por que primeiro:** enquanto a marca vinho estiver no `:root` e houver literais de marca nos componentes, nenhum tema é fiel e o "teste do tema novo" falha. Tudo em C/F depende disto.

### A.1 — Eleger base neutra única e aposentar `index.css` como fonte de tokens (#1) 🔴

- **Arquivos:** `src/index.css`, `src/styles/base.css`, `src/styles/theme-wine.css`, `src/styles/theme-blue.css`, `src/main.tsx`, `.storybook/preview.tsx`, `components.json`.
- **Passos:**
  1. Consolidar **toda** definição de token neutro em `styles/base.css` (já existe quase completa); garantir que ela contém os `@theme inline`, `:root` neutro, `.dark` neutro, fontes e `@layer base`.
  2. Mover **tudo que é marca** (`--wine-*`, `--primary`, `--accent`, `--ring`, `--sidebar-*`) para fora do `:root` — eles só vivem em `theme-wine.css`/`theme-blue.css`.
  3. Apontar entrypoints para a base: `main.tsx` importa `styles/base.css` + um tema; `.storybook/preview.tsx` importa `base.css` + os temas (hoje importa `index.css` e **não** importa `base.css`).
  4. Reduzir `index.css` a um re-export de compatibilidade (`@import "./styles/base.css";`) **ou** removê-lo após migrar os imports — decidir na execução; default proposto: manter como shim `@import` para não quebrar nada que ainda o referencie.
  5. Resolver os múltiplos blocos `.dark` concorrentes: um `.dark` neutro em `base.css`; os ajustes de marca no dark ficam em `.theme-*.dark`.
  6. Corrigir `components.json` → `tailwind.css: "src/styles/base.css"`.
- **Risco:** 🔴 — muda a forma de carregar tokens. Mitigação: shim `@import` em `index.css`; validação visual no Storybook nos 2 temas × 2 modos.
- **Prova:** Storybook renderiza idêntico em `theme-wine`/`theme-blue` (light+dark) antes/depois; nenhuma regressão de cor.

### A.2 — Remover literais de marca dos componentes (#2) 🟡

- **Arquivos:** `src/patterns/hero-balance-card.tsx`, `src/ui/stepper.tsx`, `src/ui/pin-dialog.tsx`, `src/patterns/stat-card.tsx`.
- **Passos:**
  1. `hero-balance-card`: `bg-wine-900`/`bg-wine-700`/`text-white` → tokens de superfície escura de marca (`bg-sidebar`/`text-sidebar-foreground` ou um novo par `--brand-surface`/`--brand-surface-foreground` se quisermos desacoplar do sidebar — **decisão de design, ver Pergunta 1**).
  2. `stepper`: `bg-[oklch(...)]`/`text-[oklch(...)]` do estado "concluído" → `bg-success/12 text-success` (ou tokens equivalentes).
  3. `pin-dialog`: `border-wine-700` → `border-primary` (ou token do pin-modal já existente).
  4. `stat-card`: substituir o eixo `tone="onDark"` + ternários `text-white` por consumo de token "on-surface" (resolve junto com IMP-9, o `cva` decorativo).
- **Risco:** 🟡 visual; nenhuma assinatura pública muda (exceto possível depreciação de `Stat.tone="onDark"` → ver C/D).
- **Prova:** trocar o tema no Storybook muda o `hero-balance-card` e o `stepper` de cor (hoje não muda).

> **Saída do Bloco A:** o "teste do tema novo" passa a ser viável — pré-condição para a prova de escalabilidade da Fase 3.

---

## BLOCO B — Pureza de domínio (Top 10 #3) 🔴

**Objetivo:** tirar regra de negócio do IB de dentro do DS.

- **Arquivos:** `src/ui/magic-input.tsx`, `.storybook`/story correspondente, `app-shell.tsx` (item correlato A-do-diagnóstico).
- **Passos:**
  1. `MagicInput`: remover heurísticas de boleto/Pix/CNAB ([magic-input.tsx:49-62](src/ui/magic-input.tsx:49)). O DS expõe um campo "smart paste" agnóstico que emite `onPaste(text)` / `onFile(file)` sem conhecer formatos. A detecção volta para o app (IB).
  2. `app-shell`: trocar o `formatBRL` local ([app-shell.tsx:89](src/patterns/app-shell.tsx:89)) por `import { formatBRL } from "@/lib/format"`. **Não** vou reescrever o modelo `activeAccount` neste bloco (ver Pergunta 2 — pode ser deixado como tipo genérico/slot, mas é mudança maior de API).
- **Risco:** 🔴 — `MagicInput` muda de assinatura (props `onBoletoDetect`/`onPixDetect` saem). Como ninguém consome ainda, é o melhor momento; registrar no `CHANGELOG.md` com o caminho (mover detecção para o app).
- **Prova:** story do MagicInput vira "campo de colagem + dropzone" puro; sem regex de domínio no DS (`grep` por `000201`/`47,48` → vazio).

---

## BLOCO C — Composição: patterns compõem primitivos (Top 10 #4 e #5) 🔴

**Objetivo:** este é o eixo "relação entre componentes". Patterns deixam de reinventar markup.

### C.1 — `BaseModal` passa a compor `Dialog` (#4) 🔴

- **Arquivos:** `src/ui/base-modal.tsx`, `src/ui/dialog.tsx` (consumo), story.
- **Passos:** reescrever `BaseModal` como composição fina sobre `Dialog`/`DialogContent`/`DialogHeader` (ganha foco preso, Esc, `role`, portal de graça). Migrar API `onClose` → padrão controlado `open`/`onOpenChange` do Radix, mantendo `title`/`subtitle`/`maxWidth` como props de conveniência.
- **Risco:** 🔴 — `onClose` → `onOpenChange`. Registrar no `CHANGELOG.md`.
- **Prova:** Tab/Shift+Tab presos no modal; Esc fecha; addon-a11y sem violações.

### C.2 — `SearchInput` compõe `Input` (#5) 🟡

- **Arquivos:** `src/patterns/toolbar.tsx`, `src/ui/input.tsx`.
- **Passos:** `SearchInput` passa a renderizar o primitivo `Input` com ícone via slot/wrapper, em vez do `<input>` cru. Mantém `value`/`onValueChange`.
- **Risco:** 🟡 — markup interno muda, API estável.

### C.3 — `FilterBar` compõe `Input` + `ToggleGroup` (#5) 🔴

- **Arquivos:** `src/patterns/filter-bar.tsx`, `src/ui/input.tsx`, `src/ui/toggle-group.tsx`.
- **Passos:** trocar o `<input>` cru por `Input` (ou reusar `SearchInput`); trocar o segmented control de `<button>` por `ToggleGroup` (estado/ a11y/foco corretos). Remover `text-[13px]`.
- **Risco:** 🔴 leve — comportamento de seleção pode mudar sutilmente; props podem ser ajustadas. Registrar se a forma de `filters` mudar.
- **Prova:** navegação por teclado no segmented; addon-a11y limpo.

### C.4 — Consolidar superfícies de card: `ActionCard` usa `SurfaceCard`; decidir card canônico (#5) 🔴

- **Arquivos:** `src/patterns/action-card.tsx`, `src/patterns/surface-card.tsx`, `src/ui/card.tsx`.
- **Passos:**
  1. `ActionCard` reescrito sobre `SurfaceCard interactive asChild` (mantém `label`/`desc`/`icon`).
  2. **Decisão de arquitetura (Pergunta 3):** ter `Card` (ui, `rounded-xl`) **e** `SurfaceCard` (pattern, `rounded-2xl`) é redundante. Proposta: eleger `SurfaceCard` como superfície canônica e promover para `ui/` (ou unificar via variante de raio/sombra), deixando `Card` como alias compatível.
- **Risco:** 🔴 se promover/renomear superfície. Registrar.
- **Prova:** `ActionCard` e cards diversos compartilham a mesma superfície/sombra; troca de tema afeta todos igual.

---

## BLOCO D — Consistência de API + varredura mecânica (Top 10 #6, #7, #8)

### D.1 — Padronizar `tone` como eixo semântico de cor (#6) 🔴

- **Arquivos:** `src/ui/badge.tsx` (e revisão cruzada com `status-badge.tsx`).
- **Passos:** introduzir o eixo `tone` em `Badge` (success/warning/danger/info/neutral) alinhado ao `StatusBadge`; manter `variant` atual como **alias depreciado** com `defaultVariants` preservando o visual. `tone` significa a mesma coisa em todo o DS.
- **Risco:** 🔴 (adição + depreciação). Aditivo na prática; registrar a depreciação de `variant`.

### D.2 — `cn()` em todos + tokens de sombra (#7) 🟡

- **Arquivos:** `base-modal.tsx`, `field-wrapper.tsx`, `magic-input.tsx`, `opea-logo.tsx`, `action-card.tsx` (concatenação → `cn`); `base-modal.tsx`, `pin-dialog.tsx`, `action-card.tsx` (`shadow-[var(--…)]` → `shadow-card`/`shadow-elevated`).
- **Passos:** varredura mecânica; trocar template-string por `cn(...)` e sombras arbitrárias pelos utilitários de token.
- **Risco:** 🟡 — sem mudança de API; corrige bug sutil de merge de classes.

### D.3 — Tipografia na escala semântica (#8 = IMP-10) 🟡

- **Arquivos:** `data-row.tsx`, `filter-bar.tsx`, `action-card.tsx`, `magic-input.tsx`.
- **Passos:** `text-[13px]`/`text-[16px]`/`text-[14px]`/`text-[12px]` → `text-label`/`text-body`/`text-caption`/`text-heading` conforme o caso; `h-[72px]` avaliado (manter se for medida de layout legítima, ou tokenizar).
- **Risco:** 🟡 visual mínimo.

### D.4 — Polimento de API correlato (IMP-9, POL-15) 🔴

- `Stat`: remover o `cva` decorativo e o eixo `tone="onDark"` (resolvido no Bloco A.2). `DataRow`: renomear props `k`/`v` → `label`/`value`. Registrar no `CHANGELOG.md`.

### D.5 — Mover detecção/limpezas menores (POL-16)

- Limpar comentário "Assuming a Stepper exists" em `wizard-layout.tsx`.

---

## BLOCO E — Superfície pública & docs (Top 10 #9 e #10)

### E.1 — Barrels coerentes (#9) 🟢

- **Arquivos:** novo `src/ui/index.ts`; completar `src/patterns/index.ts`.
- **Passos:**
  1. **Decisão de consumo (Pergunta 4):** estilo barrel (um `ui/index.ts` + `patterns/index.ts`) **ou** deep-import estilo shadcn. Proposta: criar `ui/index.ts` e completar o de patterns (incluir `ActionCard`, `AppShell`, `FilterBar`, `HeroBalanceCard`), padronizando.
  2. Garantir consistência de naming nos exports.
- **Risco:** 🟢 aditivo.

### E.2 — Docs reais + config (#10 = POL-12/13/14) 🟢

- **Arquivos:** `DESIGN-SYSTEM.md` (novo), `AGENTS.md` (novo), `README.md`, `App.tsx`, `components.json`.
- **Passos:** criar `DESIGN-SYSTEM.md`/`AGENTS.md` (referenciados mas inexistentes) documentando camadas, regra de dependência, convenção de API (`tone`/`cn`/`asChild`/`forwardRef`), tematização e "como adicionar componente/tema"; substituir o `README` template; limpar/substituir `App.tsx`; (o fix de `components.json` já entra em A.1).
- **Risco:** 🟢.

---

## Ordem recomendada de execução (Fase 2)

```
A.1 → A.2  (tokens)            ── parada/reporte
B          (domínio)           ── parada/reporte
C.1 → C.2 → C.3 → C.4 (composição) ── parada/reporte
D.1 → D.2 → D.3 → D.4 → D.5 (API/varredura) ── parada/reporte
E.1 → E.2  (barrels/docs)      ── parada/reporte
```

A cada bloco: commits pequenos (um assunto cada), `build`/`lint`/`type-check` verdes, story atualizada cobrindo variantes/estados nos 2 temas, e log em `DS-REFATORACAO-LOG.md`. Mudanças 🔴 entram no `CHANGELOG.md` com caminho de migração.

---

## Decisões aprovadas (Fase 1 fechada)

1. **Superfície escura de marca:** criar par dedicado `--brand-surface` / `--brand-surface-foreground` (+ accent/border/ring de marca). **A sidebar sai do DS** — haverá apenas **menu superior**.
2. **Modelo `activeAccount` do `AppShell`:** **manter por ora**; só trocar o `formatBRL` local por `@/lib/format`. Generalização vira item futuro.
3. **Card canônico:** **promover `SurfaceCard` a primitivo `ui/`**; `Card` vira alias compatível.
4. **Estratégia de consumo:** **barrels** (`ui/index.ts` + `patterns/index.ts` completo).

### Ajuste de escopo decorrente da decisão #1 — remover a sidebar

Confirmado por varredura: `src/ui/sidebar.tsx` (744 linhas) é importado **apenas** pela própria `Sidebar.stories.tsx` (nenhum pattern usa); os tokens `--sidebar-*` só alimentam o header do `app-shell.tsx`.

- **Remover** `src/ui/sidebar.tsx` e `src/stories/ui/Sidebar.stories.tsx`.
- **Substituir** a família `--sidebar-*` por `--brand-surface*` (superfície escura de marca do menu superior).
- **Migrar** `app-shell.tsx` (header) e `hero-balance-card.tsx` para os novos tokens de marca.
- `src/hooks/use-mobile.tsx` fica órfão após a remoção — manter como hook utilitário genérico (decisão de baixa relevância; nota no log).
- **Risco:** 🔴 (remoção de export público `Sidebar`) — entrada no `CHANGELOG.md`. Sem consumidores hoje.

Este ajuste entra no **Bloco A** (é trabalho de token + remoção), antes da migração visual.

**Status:** plano e decisões aprovados. Execução autorizada a iniciar pelo Bloco A. Sem push, sem `main`.
