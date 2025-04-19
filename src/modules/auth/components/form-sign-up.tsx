"use client";

import Link from "next/link";

import {
  Form,
  Input,
  Button,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/shared/components/external";

import { ROUTES } from "@/shared/constants";
import { useSignUp } from "@/modules/auth/hooks";

export function FormSignUp() {
  const { form, onSubmit, memoizedValues, toggleVisibilityPassword } =
    useSignUp();

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-4 w-full xl:w-1/3 overflow-y-auto py-10 md:py-0"
      >
        <h1 className="text-lg md:text-3xl font-bold text-center text-zinc-800">
          Crie sua conta
        </h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Nome" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="exemplo@email.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type={memoizedValues.showPassword ? "text" : "password"}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  type={memoizedValues.showPassword ? "text" : "password"}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />

              <button
                type="button"
                className="text-sm text-left text-zinc-500 cursor-pointer"
                onClick={toggleVisibilityPassword}
              >
                {memoizedValues.showPassword ? "Esconder" : "Mostrar"} senha
              </button>
            </FormItem>
          )}
        />

        {memoizedValues.error && (
          <p className="text-sm text-center text-red-500">
            {memoizedValues.error}
          </p>
        )}

        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Criando..." : "Criar"}
        </Button>

        <Link href={ROUTES.LOGIN}>
          <p className="text-sm text-center text-zinc-800 hover:text-primary">
            Já tem uma conta? Entre agora
          </p>
        </Link>
      </form>
    </Form>
  );
}
