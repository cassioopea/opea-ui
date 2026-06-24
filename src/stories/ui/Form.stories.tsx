import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

const meta = {
  title: 'Primitivos/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: function Render() {
    const form = useForm({
      defaultValues: {
        username: "",
        role: "",
      },
    });

    return (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))} 
          className="space-y-6 w-[400px] border border-border p-6 rounded-xl bg-card"
        >
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "O nome de usuário é obrigatório", minLength: { value: 3, message: "Mínimo de 3 caracteres" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormDescription>
                  Este é o seu nome de exibição público.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            rules={{ required: "Selecione um papel" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Papel</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um papel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Validar Formulário</Button>
        </form>
      </Form>
    );
  },
};
