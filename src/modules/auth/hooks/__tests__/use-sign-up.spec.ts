import { act, renderHook } from "@testing-library/react";

import { useSignUp } from "../use-sign-up";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/modules/auth/actions", () => ({
  signUp: vi.fn(),
}));

describe("useSignUp", () => {
  it("should render default values of form", () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.form.getValues()).toEqual({
      name: "",
      email: "",
      cnpj: "",
      password: "",
      confirmPassword: "",
    });

    expect(result.current.memoizedValues.showPassword).toBe(false);
  });

  it("should on change cnpj field", async () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.form.getValues()).toEqual({
      name: "",
      email: "",
      cnpj: "",
      password: "",
      confirmPassword: "",
    });

    await act(async () => {
      result.current.onChangeCnpj({
        target: { value: "1234567890" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.getValues()).toEqual({
      cnpj: "12.345.678/90",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
    });
  });

  it("should toggle password visibility", async () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.memoizedValues.showPassword).toBe(false);

    await act(async () => {
      result.current.toggleVisibilityPassword();
    });

    expect(result.current.memoizedValues.showPassword).toBe(true);
  });

  it("should handle form submission", async () => {
    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      result.current.form.setValue("name", "John Doe");
      result.current.form.setValue("email", "john.doe@example.com");
      result.current.form.setValue("cnpj", "1234567890");
      result.current.form.setValue("password", "password123");
      result.current.form.setValue("confirmPassword", "password123");
      await result.current.onSubmit();
    });

    expect(result.current.form.getValues()).toEqual({
      name: "John Doe",
      email: "john.doe@example.com",
      cnpj: "1234567890",
      password: "password123",
      confirmPassword: "password123",
    });
  });
});
