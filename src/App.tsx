import { Button } from "@/ui/button";
import { OpeaLogo } from "@/ui/opea-logo";

/**
 * Minimal dev landing. The real catalog for this design system is Storybook
 * (`npm run storybook`). This page exists only so `npm run dev` renders.
 */
function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <OpeaLogo className="h-8 w-auto text-primary" />
      <div>
        <h1 className="text-display font-semibold tracking-tight text-foreground">opea-ui</h1>
        <p className="mt-2 text-body text-muted-foreground">
          Design system da Opea. Explore os componentes no Storybook.
        </p>
      </div>
      <Button asChild>
        <a href="http://localhost:6006" target="_blank" rel="noreferrer">
          Abrir Storybook
        </a>
      </Button>
    </main>
  );
}

export default App;
