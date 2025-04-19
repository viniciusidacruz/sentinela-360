"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useMemo, useState } from "react";

import { formatCnpj } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";
import { signUp } from "@/modules/auth/actions";
import { SignUpSchema, signUpSchema } from "@/modules/auth/schemas";

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const toggleVisibilityPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = form.handleSubmit(async (data: SignUpSchema) => {
    try {
      await signUp(data);

      router.push(ROUTES.LOGIN);
      form.reset();
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  const memoizedValues = useMemo(
    () => ({
      error,
      showPassword,
    }),
    [error, showPassword]
  );

  return {
    form,
    onSubmit,
    memoizedValues,
    toggleVisibilityPassword,
  };
};
