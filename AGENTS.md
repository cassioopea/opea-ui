# AGENTS.md — regras para agentes de IA no `opea-ui`

Este é um **design system** (Storybook), consumido por Internet Banking e Backoffice. Leia [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) antes de mexer. Regras que mantêm o DS profissional e escalável:

## Faça
- **Respeite as camadas:** `lib → ui → patterns`. A dependência só flui para baixo. Primitivo nunca importa pattern; sem ciclos.
- **Componha primitivos** (`Input`, `Dialog`, `ToggleGroup`, `SurfaceCard`, `Card`…) em vez de reescrever markup.
- **Use tokens** semânticos e a **escala tipográfica** (`text-label`, `text-body`…). Cores por token (`bg-primary`, `text-success`, `bg-brand-surface`).
- **`cn(...)`** para mesclar `className`. **`cva`** para variantes (uma variação = uma variante). **`forwardRef`/`asChild`** quando fizer sentido.
- **`tone`** para cor semântica (success/warning/danger/info/neutral); **`variant`** para estilo estrutural.
- **Formate** só via `@/lib/format`. **Exporte** todo componente novo no barrel da camada.
- **Story obrigatória** por componente, cobrindo variantes/estados, validada em Wine/Blue + light/dark.
- **Gates verdes** antes de concluir: `npx tsc -b`, `npx oxlint src`, `npx vite build`.

## Não faça
- ❌ Cor/medida literal no JSX (`#hex`, `oklch(...)`, `bg-wine-*`, `text-[13px]`, `shadow-[var(...)]`).
- ❌ Regra de negócio, rota, fetch ou dado de IB/Backoffice dentro do DS (ex.: detecção de boleto/Pix → vive no app).
- ❌ Fork: criar um componente quase-duplicado em vez de uma variante.
- ❌ Concatenar `className` por template string (quebra o `tailwind-merge`).
- ❌ Marca no `:root` — a marca vive nos arquivos `theme-*.css`.
- ❌ Mudança de API silenciosa — registre em [CHANGELOG.md](CHANGELOG.md) com caminho de migração.

## Tema novo = um arquivo
Criar `src/styles/theme-<nome>.css` com a classe `.theme-<nome>` (tokens de marca) e dar `@import` em `index.css`. Nenhum componente muda.

## Notas do ambiente
- Este diretório **não é um repositório git**. Não há commits — registre execuções em `DS-REFATORACAO-LOG.md`.
- Não rode push/publish.
