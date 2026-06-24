# Auditoria de Absorção (FASE 0) — opea-ui ← backoffice-scd

Este documento detalha o que será absorvido do Backoffice pelo Design System central (`opea-ui`), separando funcionalidades reais de código-ruído gerado.

## 1. Tabela de Correspondência (O que absorver e como)

### Primitivos Shadcn (`src/ui`)
| Componente | Status | Veredito & Proposta |
| :--- | :--- | :--- |
| **Todos os 47 componentes** (`button`, `dialog`, `select`, etc.) | IDÊNTICOS | Nenhuma absorção necessária. O `opea-ui` possui 100% deles instalados com as mesmas dependências do Radix/Lucide. |

### Patterns de Domínio (`src/patterns`)
| Componente | Status | Justificativa e Proposta de Absorção |
| :--- | :--- | :--- |
| **AppShell** | PARECIDO | O `AppShell` do Backoffice suporta features **INTENCIONAIS E ÚTEIS**: *MegaMenu* aninhado (submenus complexos), *Environment Chip* e *User Profile dropdown*. O do `opea-ui` é estático e **contém cor literal** (`bg-wine-900`). <br>👉 **Proposta:** Reescrever o `AppShell` do `opea-ui` para absorver as props de navegação estruturada do Backoffice, eliminando as cores fixas e passando a usar tokens `--sidebar`. |
| **PageHeader** | PARECIDO | O do Backoffice aceita renderizar um breadcrumb customizado no topo via prop `breadcrumb`. **INTENCIONAL E ÚTIL**. <br>👉 **Proposta:** Adicionar a prop opcional `breadcrumb?: ReactNode` ao `page-header.tsx` do `opea-ui`. |
| **DataTable** | PARECIDO | O do Backoffice contém a útil composição interna `DataTablePagination`. Porém, a tabela no Backoffice foi gerada com `<table>` HTML nativo, enquanto a do `opea-ui` usa corretamente os primitivos `<Table>` Shadcn com `cva` (suportando *density*, *striped*, etc.). <br>👉 **Proposta (Filtro de Ruído):** **Descartar** a tabela nativa do Backoffice (ruído do gerador), mas **absorver** o componente de paginação acoplado para o arquivo `data-table.tsx` do `opea-ui`. |
| Demais Patterns (`EmptyState`, `MoneyText`, `SurfaceCard`, `SectionHeader`) | IDÊNTICOS | Nada a absorver, garantir importações corretas. |

## 2. Composições do Backoffice (Candidatos a Novos Patterns)

Ao analisar as rotas e páginas do Backoffice (`src/routes`), identificamos composições complexas que podem se tornar utilitários padronizados no DS:

1. **Detail Drawer (Gaveta de Detalhes):** Em `usuarios/contas.tsx` e `usuarios/usuarios.tsx`, é recorrente abrir um Side-Sheet (`<Sheet>`) rico em informações sobre um registro clicado. **Proposta:** Criar um padrão `DetailDrawer` ou variante dentro de `Sheet`/`Dialog`.
2. **Formulário / Wizard de Múltiplos Passos:** Visto em `cadastro/index.tsx`. O `opea-ui` já tem um primitivo de `stepper`, mas não um pattern genérico de `WizardLayout` que orquestra passos com rodapé fixo.

## 3. Investigação do Tema Azul (`theme-blue`)

**Diagnóstico atual do `opea-ui/src/index.css`:**
O `opea-ui` ainda está amarrado conceitualmente ao tema Vinho (IB). Suas variáveis `:root` e utilitários exportam e consomem `--wine-*`. O componente `AppShell` quebra a regra de ouro ao ter uma classe literal `bg-wine-900` presa no próprio código JSX.

**Como resolver (Proposta da Fase 4):**
1. O `AppShell` deve ser limpo e consumir classes de token `bg-sidebar` e `text-sidebar-foreground` (como ocorre brilhantemente na versão do Backoffice).
2. Criar no `index.css` a definição oficial de um modificador (ex: classe `.theme-blue` atrelada ao modo) que sobrescreva `--primary`, `--ring` e as propriedades de `--sidebar-*` mapeando-os para os tons de `--blue-*`. Dessa forma, testar o tema no Storybook será apenas encampar a aplicação com essa classe.

## 4. Risco de Ruído (O que DEVE ser descartado)

- A substituição do `<Table>` do Shadcn por tag HTML nativa `<table>` no arquivo do `DataTable` (criado pelo Lovable). É um acoplamento ruim e sem suporte a CVA. Absorveremos só as features de paginação.
- O logotipo `OpeaLogo.tsx` posicionado equivocadamente dentro da pasta `patterns` no Backoffice (no `opea-ui` ele já está adequadamente em `ui/opea-logo.tsx`).
