# Auditoria do Design System: opea-ui vs opea-fintech-refresh

## 1. Inventário Lado a Lado (Componentes)

Após varredura completa nos diretórios `src/ui` e `src/patterns` do **opea-ui** e **opea-fintech-refresh**, o inventário apresenta a seguinte classificação:

### 🟢 FIEL (Reproduzem o IB com exatidão)
A grande maioria dos primitivos baseados em Radix são fiéis, pois não possuem estilos injetados que divergem estruturalmente:
- `accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `breadcrumb`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `field-wrapper`, `form`, `hover-card`, `input-otp`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `pin-dialog`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `status-badge`, `stepper`, `switch`, `tabs`, `textarea`, `toggle-group`, `toggle`, `tooltip`
- *Patterns:* `account-selector`, `empty-state`, `money-text`, `page-header`, `section-header`, `stat-card`, `surface-card`, `toolbar`

### 🟡 DIVERGENTE (Mesmo componente, estilos/props hardcoded)
- **`data-table.tsx` (Pattern):** Tem estilos hardcoded (`bg-muted/30`, `pl-5` em checkboxes, `hover:bg-wine-50/30` ou `hover:bg-muted/50`). Não possui props para densidade, zebra (striped), sticky header ou sticky column.
- **`table.tsx` (UI):** Primitivo com espaçamentos hardcoded no JSX (`[&_tr]:border-b`, `p-4 align-middle`, etc.) que engessam a densidade da tabela.
- **`sidebar.tsx` (UI):** Contém diversas lógicas de espaçamento e larguras hardcoded (`w-[--sidebar-width]`, etc.) que não foram mapeadas como variantes de densidade ou comportamento.
- **`button.tsx` (UI):** O CVA possui as variantes de estilo, mas algumas cores ou estados podem diferir do IB real dependendo da aplicação do tema.
- **`badge.tsx` (UI):** Variantes padrão não cobrem todos os tons do IB de forma semântica pura.

### 🔴 FORK INVENTADO (Não existem no IB original como arquivo solto)
- **`data-row.tsx` (UI):** Inventado pela IA para renderizar linhas de dados.
- **`opea-logo.tsx` e `pix-icon.tsx` (UI):** Inventados como componentes de UI separados, quando no IB costumam ser SVGs internos ou estar em pasta de assets.
- **`action-card.tsx`, `app-shell.tsx`, `filter-bar.tsx`, `hero-balance-card.tsx` (Patterns):** Componentes gerados como "Patterns" no `opea-ui`, mas no IB original o `app-shell` fica solto na raiz (`src/components/app-shell.tsx`) e os outros são puramente fragmentos extraídos da tela de Dashboard/Extrato.

### ⚪ COMPOSIÇÃO FALTANTE
- Páginas completas ou layouts (ex: "Lista com filtros + Tabela", "Painel de Aprovações").

---

## 2. Mapa de Estilos Hardcoded → Variáveis (O que deve virar variante)

### `DataTable` (e `Table` Primitivo)
- **Hardcoded:** Fundo do header (`bg-muted/30`), padding de checkboxes (`pl-5`), background de hover em linhas (`hover:bg-muted/50` ou `hover:bg-wine-50/30`), classes de truncamento direto nos filhos.
- **Proposta de Variantes:**
  - `density: 'comfortable' | 'compact'` (Aplica paddings menores `p-2` vs `p-4`).
  - `striped: boolean` (Aplica fundo alternado `even:bg-muted/20`).
  - `hoverable: boolean` (Ativa/desativa `hover:bg-muted/50`).
  - `stickyHeader: boolean` (Header com `sticky top-0 z-10`).
  - `stickyFirstColumn: boolean` (Primeira coluna com `sticky left-0`).
  - `bordered: 'none' | 'rows' | 'grid'`.
  - `size: 'sm' | 'md'`.
- **Em `DataTableColumn`:** `align: 'left' | 'right' | 'center'`, `numeric: boolean` (Aplica `tabular-nums`), `truncate: boolean` (Aplica `truncate max-w-[X]`), `sticky: boolean`.

### Outros Componentes Relevantes
- **`SurfaceCard`:** Tem hardcoded classes de hover/interativo. 
  - Proposta: Variante `interactive: boolean` e `elevation: 'none' | 'sm' | 'md'`.
- **`SectionHeader`:** 
  - Proposta: Variante `size: 'sm' | 'lg'` dependendo se é título de seção interna ou página inteira.
- **`AppShell`:**
  - Proposta: Extrair comportamento do header (sticky ou não) e modo de privacidade (`privacyMode: boolean`).

---

## 3. Catálogo de Variações Observadas (Requisitos de Props)

A partir da varredura, sabemos que o IB usa as Tabelas de diversas formas:
1. **Dashboard / Extrato:** Tabela com espaçamento confortável, sem bordas laterais, hover destacado, textos numéricos em formato tabular.
2. **Backoffice (Contas / Operações):** Tabelas extremamente densas (`compact`), muitas colunas, necessitam truncamento (`truncate`) e zebra (`striped`) para facilidade de leitura.
3. **Aprovações:** Tabela interativa com `selectable` (checkboxes na primeira coluna) e estado de `emptyState` rebuscado.

Esta auditoria serve de base para executarmos a **FASE 1 (Tabelas)**, unificando tudo em um único `DataTable` impulsionado por `cva`.
