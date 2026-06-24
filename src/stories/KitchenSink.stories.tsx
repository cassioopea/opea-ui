import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Separator } from '@/ui/separator';

const meta: Meta = {
  title: 'Design System/Kitchen Sink',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const AllComponents: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-5xl mx-auto p-8 pb-32 font-sans bg-background text-foreground">
      
      <div>
        <h1 className="text-display font-bold mb-2">Kitchen Sink</h1>
        <p className="text-body text-muted-foreground">
          Uma visualização global de todos os micro-componentes para validação do sistema de design e dos tokens de tema.
        </p>
      </div>

      <Separator />

      {/* Buttons */}
      <section className="space-y-6">
        <div>
          <h2 className="text-title font-semibold mb-1">Botões</h2>
          <p className="text-caption text-muted-foreground">Estilos principais e secundários para interações.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <div>
          <h2 className="text-title font-semibold mb-1">Badges</h2>
          <p className="text-caption text-muted-foreground">Indicadores de status e categorização.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
        </div>
      </section>

      {/* Forms & Inputs */}
      <section className="space-y-6">
        <div>
          <h2 className="text-title font-semibold mb-1">Formulários & Inputs</h2>
          <p className="text-caption text-muted-foreground">Campos de texto e entrada de dados.</p>
        </div>
        <div className="grid max-w-sm gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" id="email" placeholder="nome@empresa.com" />
            <p className="text-caption text-muted-foreground">Insira seu e-mail corporativo.</p>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input disabled id="disabled" placeholder="Campo desabilitado" />
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="space-y-6">
        <div>
          <h2 className="text-title font-semibold mb-1">Avatares</h2>
          <p className="text-caption text-muted-foreground">Representação visual de entidades e usuários.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">OP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-success/10 text-success font-semibold">OK</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-destructive/10 text-destructive font-semibold">ER</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-title font-semibold mb-1">Cards</h2>
          <p className="text-caption text-muted-foreground">Superfícies de contenção de conteúdo.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Painel do Usuário</CardTitle>
              <CardDescription>Gerencie suas permissões e acessos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body text-foreground">Aqui ficaria o conteúdo principal do card, como formulários ou resumos.</p>
            </CardContent>
            <CardFooter>
              <Button>Salvar alterações</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle>Card com Tema Destaque</CardTitle>
              <CardDescription className="text-primary-foreground/70">Ideal para banners ou call-to-action.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body">Superfícies primárias reagem diretamente à cor mestre do tema ativo (Wine ou Blue).</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Ação Primária</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

    </div>
  ),
};
