import { Metadata } from "next";

import { BASIC_INFO } from "@/shared/constants";
import { FormSignUp } from "@/modules/auth/components";

export const metadata: Metadata = {
  title: `Criar conta - ${BASIC_INFO.title}`,
};

export default function SignUp() {
  return <FormSignUp />;
}
