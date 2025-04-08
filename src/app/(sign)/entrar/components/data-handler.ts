"use client";

import { useForm } from "react-hook-form";
import { ChangeEvent, FocusEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCnpj } from "@/shared/hooks";
import { SignInSchema, signInSchema } from "@/shared/schemas";

export const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInSchema>({
    defaultValues: {
      cnpj: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const { validateCnpj, formatCnpj } = useCnpj();

  const toggleVisibilityPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = form.handleSubmit(async (data: SignInSchema) => {
    console.log(data);
  });

  const onBlurCheckCnpj = async (event: FocusEvent<HTMLInputElement>) => {
    const isActive = await validateCnpj(event.target.value);

    if (!isActive) {
      return form.setError("cnpj", { message: "CNPJ inválido" });
    }

    return form.clearErrors("cnpj");
  };

  const onChangeCnpj = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedCnpj = formatCnpj(value);

    form.setValue("cnpj", formattedCnpj);
  };

  return {
    form,
    onSubmit,
    onChangeCnpj,
    showPassword,
    onBlurCheckCnpj,
    toggleVisibilityPassword,
  };
};
