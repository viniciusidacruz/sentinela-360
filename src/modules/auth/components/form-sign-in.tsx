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
import { useSignIn } from "@/modules/auth/hooks";

export function FormSignIn() {
  const {
    form,
    onSubmit,
    memoizedValues,
    toggleVisibilityPassword,
    onChangeCnpj,
  } = useSignIn();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 w-full xl:w-1/3">
        <h1 className="text-lg md:text-3xl font-bold text-center text-zinc-800">
          Entre com suas credenciais
        </h1>

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                  onChange={onChangeCnpj}
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
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="w-full"
          size="lg"
        >
          {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>

        <Link href={ROUTES.REGISTER}>
          <p className="text-sm text-center text-zinc-800 hover:text-primary">
            Não tem uma conta? Crie uma agora
          </p>
        </Link>
      </form>
    </Form>
  );
}
