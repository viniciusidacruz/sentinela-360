import type { Metadata } from "next";

import { BASIC_INFO } from "@/shared/constants";
import { FormSignIn } from "@/modules/auth/components";

export const metadata: Metadata = {
  title: `Entrar - ${BASIC_INFO.title}`,
};

export default function SignIn() {
  return <FormSignIn />;
}
