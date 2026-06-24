# Changelog

Mudanças notáveis do `opea-ui`. Mudanças que afetam a **API pública** ou os **tokens** ficam aqui, com caminho de migração. Como IB e Backoffice ainda não consomem o DS, este é o melhor momento para mudanças estruturais — mas tudo é registrado.

## [Não lançado]

### Bloco F — Pendências (pureza, escala, empacotamento)

#### Alterado (BREAKING)
- **`AppShell` não carrega mais modelo de domínio.** Removidos `activeAccount`, `environment`, `isPrivacyMode`, `onTogglePrivacy`.
  - Props novas: **`utilityStart?`** e **`utilityEnd?`** (`ReactNode`) — a barra contextual acima do menu é preenchida pelo app.
  - *Migração:* o app compõe a barra de conta/saldo/ambiente/privacidade com primitivos do DS (ex.: `MoneyText` tem prop `privacy`) e passa em `utilityStart`/`utilityEnd`. Veja `Showcase.stories` (IB) e `AppShell.stories`.

#### Adicionado
- Token tipográfico **`--text-hero`** (`2.5rem`); `MoneyText size="xl"` passa a usá-lo (escala 100% tokenizada).
- `package.json`: `sideEffects: ["**/*.css"]` e mapa `exports` (`.`, `./patterns`, `./lib/*`, `./styles/*.css`) para consumo como pacote de workspace.

### Bloco E — Superfície pública & docs

#### Adicionado
- **Barrel `@/ui`** (`src/ui/index.ts`) exportando todos os primitivos. `@/patterns` completado com `ActionCard`, `AppShell`, `FilterBar`, `HeroBalanceCard`.
- Documentação: `DESIGN-SYSTEM.md` e `AGENTS.md`.

#### Alterado
- `SurfaceCard` agora é exportado por `@/ui` (camada de primitivo). Removido do barrel `@/patterns` (o deep-path `@/patterns/surface-card` segue funcionando).
- `README.md` reescrito; `App.tsx` agora é uma landing mínima do DS.

### Bloco D — Consistência de API

#### Adicionado
- **`Badge` ganhou o eixo `tone`** (`success | warning | danger | info | neutral`), vocabulário semântico compartilhado com `StatusBadge`. `Badge` agora é `forwardRef`.

#### Alterado (BREAKING)
- **`Badge`: valores `variant="success"` e `variant="warning"` removidos.** Use `tone="success"` / `tone="warning"`.
- **`DataRow`: props `k`/`v` renomeadas para `label`/`value`** (+ `className`).

#### Corrigido
- `pin-dialog` usava gradiente de marca literal (`from-wine-900 to-wine-700`) → tokens (`from-brand-surface to-primary`).
- `cn()` aplicado em `field-wrapper`/`opea-logo`; `shadow-[var(...)]` → `shadow-elevated` no `pin-dialog`; tipografia arbitrária → escala em `data-row`/`stepper`/`app-shell`.
- `base.css` deixou de registrar utilities de marca (`--color-wine-*`/`--color-blue-*`): a base é 100% neutra.

### Bloco C — Composição

#### Alterado (BREAKING)
- **`BaseModal` agora é controlado e composto sobre `Dialog`.**
  - Props removidas: `onClose`, `maxWidth`.
  - Props novas: `open: boolean`, `onOpenChange: (open) => void`. Largura via `className` (ex.: `sm:max-w-md`).
  - *Migração:* `{open && <BaseModal onClose={...}>}` → `<BaseModal open={open} onOpenChange={setOpen}>` (sem o guard `open &&`; o Dialog controla a montagem). Ganho: foco preso, Esc, scroll lock e aria do Radix.
- **`SurfaceCard` movido para `@/ui/surface-card`** (era `@/patterns/surface-card`). O caminho antigo continua funcionando via re-export, mas prefira o novo.

#### Alterado (visual, não-breaking de API)
- **`Card`** agora usa a superfície canônica do `SurfaceCard` (rounded-2xl + `shadow-card` + `border-border/70`), antes era rounded-xl + `shadow`. Subcomponentes inalterados.

#### Corrigido
- `SearchInput` e `FilterBar` agora compõem o primitivo `Input`; `FilterBar` usa `ToggleGroup` (acessível) no lugar de `<button>` crus. `ActionCard` compõe `SurfaceCard`. Tipografia arbitrária (`text-[13px]`/`text-[14px]`/`text-[12px]`) trocada por tokens da escala. `shadow-[var(--shadow-card)]` → superfície via `SurfaceCard`.

### Bloco B — Pureza de domínio

#### Alterado (BREAKING)
- **`MagicInput` deixou de detectar formatos de negócio** (boleto/Pix/CNAB). Agora é um campo agnóstico de "smart paste".
  - Props removidas: `onBoletoDetect`, `onPixDetect`, `onFileDetect`, `onValidPaste`.
  - Props novas: `value?`, `onValueChange?(text)`, `onFile?(file)`.
  - *Migração:* a detecção (regex de boleto, payload Pix, parsing CNAB) deve viver no app consumidor (IB). O DS apenas entrega o texto digitado/colado e o arquivo solto.

#### Corrigido
- `AppShell` usa `formatBRL` de `@/lib/format` em vez de `toLocaleString` inline (single source of truth).

### Bloco A — Tokens & tematização

#### Removido (BREAKING)
- **Componente `Sidebar`** (`src/ui/sidebar.tsx`) e sua story foram **removidos** do design system. Decisão de produto: a navegação será apenas por **menu superior** (`AppShell`). Nenhum pattern dependia do `Sidebar`.
  - *Migração:* usar `AppShell` (menu superior). Caso um app precise de navegação lateral, ela deve viver no app, não no DS.

#### Alterado (BREAKING)
- **Família de tokens `--sidebar-*` → `--brand-surface*`.** A superfície escura de marca (barra de menu superior, hero) agora usa `--brand-surface` / `--brand-surface-foreground`, definidos por tema. Removidos `--sidebar`, `--sidebar-foreground`, `--sidebar-primary(-foreground)`, `--sidebar-accent(-foreground)`, `--sidebar-border`, `--sidebar-ring`.
  - *Migração:* `bg-sidebar` → `bg-brand-surface`; `text-sidebar-foreground` → `text-brand-surface-foreground`. Demais sub-tokens de sidebar não têm equivalente (eram do primitivo removido).
- **`Stat` (pattern): prop `tone="onDark"` → `tone="onBrand"`.** O valor antigo aplicava `text-white` fixo; o novo consome `--brand-surface-foreground` (tematiza).
  - *Migração:* trocar `<Stat tone="onDark" …>` por `<Stat tone="onBrand" …>`.

#### Arquitetura de tokens (sem impacto de API)
- A marca **deixou de viver no `:root`**. Agora: `styles/base.css` = tokens neutros; `theme-wine.css` / `theme-blue.css` = tokens de marca por tema. Um **tema novo = um arquivo** `.theme-*` + `@import` em `index.css`, sem tocar componente.
- Requer uma classe de tema (`.theme-wine` / `.theme-blue`) no `<html>` para os tokens de marca resolverem.

#### Corrigido
- Literais de marca removidos de `hero-balance-card`, `stepper`, `pin-dialog`, `stat-card` (agora tematizáveis).
- `hero-balance-card` usa `formatBRL` de `@/lib/format` em vez de formatação local.
- `components.json` apontava para `src/styles.css` inexistente → `src/styles/base.css`.
- `tsconfig.app.json`: removido `baseUrl` deprecado (TS5101) que abortava o type-check.
