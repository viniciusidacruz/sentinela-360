"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/shared/store";
import { ROUTES } from "@/shared/constants";
import { signIn } from "@/modules/auth/actions";
import { SignInSchema, signInSchema } from "@/modules/auth/schemas";

export const useSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useStore(
    useShallow((state) => ({
      setUser: state.setUser,
    }))
  );

  const router = useRouter();

  const form = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const toggleVisibilityPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = form.handleSubmit(async (data: SignInSchema) => {
    try {
      const { user } = await signIn(data);

      setUser(user);
      setError(null);

      router.push(ROUTES.DASHBOARD);
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
