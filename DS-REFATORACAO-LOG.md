# DS-REFATORACAO-LOG — execução da Fase 2

> Diário de execução do [DS-PLANO-REFATORACAO.md](DS-PLANO-REFATORACAO.md). Este diretório **não é um repositório git** (`git: false`), portanto não há commits — cada bloco é registrado aqui. Gates por bloco: `npx tsc -b` (type-check), `npx oxlint src` (lint), `npx vite build` (build).

---

## Baseline (estabilização pré-existente)

Ao habilitar o type-check, descobriu-se que o **baseline já estava vermelho** — não por mudança minha:

- `tsconfig.app.json` usava `baseUrl` (deprecado, TS5101) que **abortava** o `tsc` antes de checar tipos. Removido `baseUrl` (mantido `paths`, que resolve sozinho em `moduleResolution: bundler`).
- Com isso surgiram **15 erros pré-existentes**: imports não usados (`React`/ícones sob `noUnusedLocals`) em 12 arquivos, e a story `DataTable › WithPagination` referenciando `defaultColumns`/`defaultData` inexistentes.
- Correções: removidos os imports órfãos; `WithPagination` convertida para o formato `render` com `args: {} as any` (padrão das outras stories); `Showcase › IB_Dashboard` extraída para componente nomeado `IBDashboardDemo` (corrige `react-hooks/rules-of-hooks`).

**Resultado:** `tsc -b` → 0 erros; `oxlint src` → 0 erros (restam só *warnings* do padrão shadcn `only-export-components` e `no-useless-escape` em `magic-input`, este último sai no Bloco B).

---

## Bloco A — Tokens & tematização ✅

### A.1 — Base neutra única + remoção da sidebar
- **`src/styles/base.css`** passa a ser a **única** base neutra; substituída a família de utilities `--color-sidebar*` por `--color-brand-surface` / `--color-brand-surface-foreground`.
- **`theme-wine.css` / `theme-blue.css`**: removidos todos os `--sidebar*`; adicionado o par `--brand-surface` / `--brand-surface-foreground` (light e dark) por tema. Arquivos agora contêm **só tokens de marca**.
- **`src/index.css`** vira um shim documentado: `@import base.css + theme-wine + theme-blue`. A marca **não** vive mais no `:root`.
- **`.storybook/preview.tsx`** importa `base.css` + temas (antes importava `index.css`).
- **`index.html`** recebe `class="theme-wine"` no `<html>` (tema padrão do app de dev).
- **`components.json`**: `tailwind.css` corrigido de `src/styles.css` (inexistente) → `src/styles/base.css`.
- **Sidebar removida do DS** (decisão #1): apagados `src/ui/sidebar.tsx` (744 linhas) e `src/stories/ui/Sidebar.stories.tsx`. Confirmado que nenhum pattern a usava. `app-shell.tsx` migrado de `*-sidebar*` → `*-brand-surface*` (31 ocorrências). Stories que usavam tokens `sidebar` (`AppShell`, `BackofficeScreens`, `Tokens`) migradas.
- **Prova:** build gera as utilities `bg-brand-surface`/`text-brand-surface-foreground` e a var `--brand-surface`; **zero** ocorrências de `sidebar` no CSS final.

### A.2 — Remoção de literais de marca dos componentes
- **`hero-balance-card.tsx`**: `bg-wine-900`/`bg-wine-700`/`text-white*` → `bg-brand-surface` / `bg-primary` (glow) / `text-brand-surface-foreground[/NN]`. `formatMetric` local trocado por `formatBRL` de `@/lib/format`.
- **`stat-card.tsx`**: removido o `cva` decorativo (variantes vazias, IMP-9); eixo `tone` renomeado `onDark` → **`onBrand`** e tokenizado (`text-brand-surface-foreground`). Tipo `StatTone` exportável.
- **`stepper.tsx`**: estado "concluído" `bg-[oklch(…)]`/`text-[oklch(…)]` → `bg-success/12 text-success` (dot) e `bg-success/30` (conector).
- **`pin-dialog.tsx`**: `border-wine-700` → `border-primary`.
- **Prova:** `grep` por `wine|oklch literal|text-white|onDark` em `src/ui` + `src/patterns` → **vazio**.

### Gates do Bloco A
`tsc -b` ✅ 0 · `oxlint src` ✅ 0 erros · `vite build` ✅

### ⚠️ Mudanças de API (ver CHANGELOG.md)
- Remoção do export público `Sidebar` (e subcomponentes) — sem consumidores.
- Família de tokens `--sidebar*` → `--brand-surface*`.
- `Stat`: prop `tone="onDark"` → `tone="onBrand"`.

### Recomendação de verificação visual
Abrir o Storybook e alternar **Wine ↔ Blue** (light/dark) no `HeroBalanceCard` e no `Stepper`: agora **mudam de cor com o tema** (antes ficavam presos ao vinho). Esta é a prova prática da correção CRÍTICO-1/2.

---

## Bloco B — Pureza de domínio ✅

- **`magic-input.tsx`**: removida toda a regra de negócio (detecção de boleto `^\d{47,48}$`, payload Pix `000201`, menção a CNAB). Reescrito como **campo agnóstico** "smart paste": props `value?`, `onValueChange?(text)`, `onFile?(file)`, `placeholder?`, `className?`. Mantida a estética (sparkle + dropzone). Removidos: o pill decorativo "Detectar Auto", o estado que limpava o input em "detecção", e a regex (some também o warning `no-useless-escape`). Passou a usar `cn()`.
- **`app-shell.tsx`**: removido o `formatBRL` local (`toLocaleString` inline); agora importa `formatBRL` de `@/lib/format` (single source of truth). Os usos em `activeAccount.saldo`/`aggregatedBalance` consomem o helper central.
- **Prova:** nenhum uso da API antiga (`onBoletoDetect`/`onPixDetect`/`onFileDetect`/`onValidPaste`) em `src`; nenhuma regra de negócio (boleto/pix/cnab) em `ui`+`patterns` exceto a frase do comentário explicando o que o componente **não** faz.

### Gates do Bloco B
`tsc -b` ✅ 0 · `oxlint src` ✅ 0 erros · `vite build` ✅

### ⚠️ Mudanças de API (ver CHANGELOG.md)
- `MagicInput`: API de detecção removida → API agnóstica (`onValueChange`/`onFile`).

---

## Bloco C — Composição (patterns compõem primitivos) ✅

### C.4 — Superfície de card canônica
- **`SurfaceCard` promovido a primitivo `src/ui/surface-card.tsx`** (era pattern). `src/patterns/surface-card.tsx` virou re-export de compatibilidade (`@/ui/surface-card`).
- **`Card` (ui) agora compõe `SurfaceCard`** (`padding="none"`): raiz unificada na mesma superfície (rounded-2xl/border/shadow-card). Subcomponentes `CardHeader/Title/Description/Content/Footer` preservados. Fim do fork de duas superfícies divergentes.

### C.1 — `BaseModal` compõe `Dialog`
- Reescrito sobre `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`. Ganha **foco preso, Esc, scroll lock, botão de fechar e aria** do Radix (antes era overlay manual sem nada disso). API migrada de `onClose` (não controlado) → **`open`/`onOpenChange`** (controlado Radix). `maxWidth` (string) → `className` (ex.: `sm:max-w-md`). Story atualizada.

### C.2 — `SearchInput` compõe `Input`
- `toolbar.tsx`: o `<input>` cru virou o primitivo `Input` com ícone de busca sobreposto. API (`value`/`onValueChange`) preservada.

### C.3 — `FilterBar` compõe `SearchInput` + `ToggleGroup`
- `filter-bar.tsx` reescrito: busca via `SearchInput` (reuso de C.2); segmented control de `<button>` cru → `ToggleGroup`/`ToggleGroupItem` (navegação por teclado, roving focus, aria). Visual "selecionado = primary" preservado via `data-[state=on]:bg-primary`. Removido `text-[13px]` (→ `text-label`). Adicionada prop `className`.

### ActionCard → SurfaceCard
- `action-card.tsx`: `<button>` cru com `shadow-[var(--shadow-card)]` → `SurfaceCard asChild interactive padding="sm"` envolvendo o `<button>`. Tipografia `text-[14px]`/`text-[12px]` → `text-body`/`text-caption`. Mescla via `cn()`. Foco visível mantido.

### Gates do Bloco C
`tsc -b` ✅ 0 · `oxlint src` ✅ 0 erros · `vite build` ✅. Sem resíduo de `onClose`/`shadow-[var`/`text-[Npx]`/`${className}` nos arquivos do bloco.

### ⚠️ Mudanças de API (ver CHANGELOG.md)
- `BaseModal`: `onClose` → `open`/`onOpenChange`; `maxWidth` → `className`.
- `SurfaceCard` movido para `@/ui/surface-card` (re-export mantido em `@/patterns/surface-card`).
- `Card`: superfície agora rounded-2xl/shadow-card (antes rounded-xl/shadow).

---

## Bloco D — Consistência de API + varredura mecânica ✅

- **D.1 `Badge`**: adicionado o eixo semântico **`tone`** (`success|warning|danger|info|neutral`), alinhado ao `StatusBadge` (pills suaves `bg-x/12 text-x ring-x/25`). `variant` reduzido aos estruturais (`default|secondary|destructive|outline`). `Badge` agora é `forwardRef`. Os usos `variant="success"/"warning"` nas stories migrados para `tone`.
- **D.2 `cn()` + sombras de token**: `field-wrapper`, `opea-logo` (concatenação → `cn`); `pin-dialog` (`shadow-[var(--shadow-elevated)]` → `shadow-elevated`).
- **D.3 Tipografia na escala**: `data-row` (`text-[13px]/[16px]/[13.5px]` → `text-label`/`text-body`), `stepper` (`text-[12px]/[11.5px]` → `text-caption`), `app-shell` (`text-[11px]` → `text-caption`).
- **D.4 `data-row`**: props `k`/`v` → **`label`/`value`** (+ `className`, `cn`); todos os call sites das stories atualizados. (`Stat` cva decorativo já removido no Bloco A.)
- **D.5**: comentário "Assuming a Stepper exists" removido do `wizard-layout`.
- **Achado tardio corrigido**: gradiente de marca `from-wine-900 to-wine-700` no `pin-dialog` → `from-brand-surface to-primary` (tematiza).

### Gates do Bloco D
`tsc -b` ✅ 0 · `oxlint src` ✅ 0 erros · `vite build` ✅. Varredura: zero `${className}`, zero `shadow-[var`, zero `text-[Npx]`, **zero literal de cor** em `ui`+`patterns`.

---

## Bloco E — Superfície pública & docs ✅

- **E.1 Barrels**: criado `src/ui/index.ts` (todos os primitivos); `src/patterns/index.ts` completado com `ActionCard`, `AppShell`, `FilterBar`, `HeroBalanceCard` (+ tipos). `SurfaceCard` movido para a camada `ui` no barrel.
- **E.2 Docs/config**: criados **`DESIGN-SYSTEM.md`** e **`AGENTS.md`** (antes referenciados e inexistentes). `README.md` substituído (era template Vite). `App.tsx` substituído por landing mínima que consome o DS e aponta para o Storybook.

### Gates do Bloco E
`tsc -b` ✅ 0 · `oxlint src` ✅ 0 erros · `vite build` ✅.

---

## Fase 3 — Verificação contra a régua ✅

1. **Mapa de dependências (re-rodado):** zero violação de camada (`grep "@/patterns" src/ui` → vazio); zero ciclo (toolbar não importa filter-bar; money/stat não importam hero); única dependência de app é o `renderLink` injetável do `app-shell`.
2. **Sanidade:** zero literal de cor/medida em `ui`+`patterns`; `any` apenas em `chart.tsx` (idiom shadcn/recharts); nenhum import de router/query/fetch.
3. **Prova de tema:** `base.css` é **100% neutro** (grep por `wine|blue|--primary|--brand-surface` → vazio); os arquivos `theme-*.css` são auto-contidos. No CSS final, **nenhuma utility wine/blue é gerada** e `--brand-surface` + `.theme-wine` + `.theme-blue` estão presentes. → Adicionar um tema novo é **um arquivo** `theme-*.css` + `@import`, zero mudança em componente.
4. **Prova de cobertura:** `Showcase.stories` (IB Dashboard) e `BackofficeScreens.stories` reproduzem telas reais compondo **só** componentes do DS — compilam e buildam.
5. **Docs:** `DESIGN-SYSTEM.md` + `AGENTS.md` atualizados com a arquitetura final.

### Reavaliação A–G (antes → depois)

| Dim. | Antes | Depois | Por quê |
| :-: | :-- | :-- | :-- |
| A — Arquitetura/relação | Adequado | **Forte** | Camadas limpas mantidas; composição horizontal corrigida; vazamentos de domínio removidos. |
| B — Consistência de API | Frágil | **Forte** | `tone` unificado; `cn()` em todos; `Badge` forwardRef; props `label/value`. |
| C — Tokens/tema | Frágil | **Forte** | Base neutra única; marca só em `theme-*`; zero literal. |
| D — Composição | Adequado | **Forte** | BaseModal/SearchInput/FilterBar/ActionCard compõem primitivos; superfície de card unificada. |
| E — Acessibilidade | Adequado | **Forte** | BaseModal herda a11y do Radix; FilterBar usa ToggleGroup acessível; sidebar (não-a11y custom) removida. |
| F — Escalabilidade | Frágil | **Forte** | Tema = 1 arquivo; barrels coerentes (ui+patterns). |
| G — Robustez | Adequado | **Adequado+** | Mantida tipagem forte; baseline de type-check destravado (agora verde). `any` residual só no chart. |

**Pendências conscientes:** todas encaminhadas no Bloco F (abaixo).

---

## Bloco F — Pendências conscientes ✅

- **F1 — token `--text-hero`**: adicionado à escala em `base.css` (`2.5rem`, line-height 1). `MoneyText size="xl"` agora usa `text-hero` em vez de `text-[2.5rem]`. Escala tipográfica 100% tokenizada.
- **F2 — `AppShell` generalizado (sem domínio IB)**: removidos os props `activeAccount` (modelo de conta), `environment`, `isPrivacyMode`, `onTogglePrivacy`. Em seu lugar, dois slots neutros **`utilityStart`** / **`utilityEnd`** que o app preenche. A barra contextual deixou de conhecer "saldo/agência/conta". Stories (`Showcase` IB e `AppShell`) reescritas compondo a barra de conta com primitivos + `MoneyText` (usando seu prop `privacy`). O DS não carrega mais nenhum modelo de produto.
- **F3 — empacotamento**: `package.json` ganhou `"sideEffects": ["**/*.css"]` (preserva CSS, mantém JS tree-shakeable) e um mapa `"exports"` para os barrels (`.`, `./patterns`), `./lib/*` e `./styles/*.css` — preparado para consumo como pacote de workspace (fonte TS, compilada pelo bundler do consumidor).

### Gates do Bloco F
`npm run build` ✅ · `oxlint src` ✅ 0 erros. Verificação: nenhum `activeAccount/saldo/agencia` em `app-shell`; nenhum `text-[2.5rem]`; `package.json` válido.

### ⚠️ Mudanças de API (ver CHANGELOG.md)
- `AppShell`: removidos `activeAccount`/`environment`/`isPrivacyMode`/`onTogglePrivacy` → slots `utilityStart`/`utilityEnd`.
