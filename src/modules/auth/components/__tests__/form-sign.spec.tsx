import { render, screen } from "@testing-library/react";

import { FormSignIn } from "../form-sign-in";
import { Input } from "@/shared/components/external";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/external";

vi.mock("@/shared/components/external", () => ({
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
}));

vi.mock("@/modules/auth/hooks", () => ({
  useSignIn: () => ({
    form: {
      register: vi.fn(),
      formState: { errors: {}, isValid: true, isSubmitting: false },
      control: {
        register: vi.fn(),
        unregister: vi.fn(),
        getFieldState: vi.fn(),
        _names: {
          mount: new Set(),
          unMount: new Set(),
          array: new Set(),
          watch: new Set(),
          watchAll: false,
          focus: "",
          watchAllWithDefault: false,
        },
        _subjects: {
          watch: vi.fn(),
          array: vi.fn(),
          state: vi.fn(),
        },
        _getWatch: vi.fn(),
        _formValues: {},
        _defaultValues: {},
        _proxyFormState: {
          isDirty: false,
          isTouched: false,
          dirtyFields: {},
          touchedFields: {},
          isValidating: false,
          isValid: true,
          errors: {},
        },
      },
    },
    onSubmit: vi.fn(),
    memoizedValues: {
      error: null,
      showPassword: false,
    },
    toggleVisibilityPassword: vi.fn(),
    onChangeCnpj: vi.fn(),
  }),
}));

vi.mock("react-hook-form", () => ({
  ...vi.importActual("react-hook-form"),
  FormProvider: ({ children }: { children: React.ReactNode }) => children,
  useFormContext: () => ({
    register: vi.fn(),
    formState: { errors: {} },
  }),
  Controller: ({ children }: { children: React.ReactNode }) => children,
}));

describe("FormSignIn", () => {
  it("should render the form", () => {
    render(<FormSignIn />);

    expect(screen.getByText("Entre com suas credenciais")).toBeInTheDocument();
  });

  it("should render the form fields", () => {
    render(<FormSignIn />);

    expect(screen.getByLabelText("CNPJ")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });
});
