import { act, renderHook } from "@testing-library/react";

import { useSignIn } from "../use-sign-in";

vi.mock("@/shared/utils/format-cnpj", () => ({
  formatCnpj: vi.fn().mockImplementation((value) => value),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/modules/auth/actions", () => ({
  signIn: vi.fn(),
}));

describe("useSignIn", () => {
  it("should render default values of form", () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.form.getValues()).toEqual({
      cnpj: "",
      password: "",
    });

    expect(result.current.memoizedValues.showPassword).toBe(false);
  });

  it("should toggle password visibility", async () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.memoizedValues.showPassword).toBe(false);

    await act(async () => {
      result.current.toggleVisibilityPassword();
    });

    expect(result.current.memoizedValues.showPassword).toBe(true);
  });

  it("should on change cnpj field", async () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.form.getValues()).toEqual({
      cnpj: "",
      password: "",
    });

    await act(async () => {
      result.current.onChangeCnpj({
        target: { value: "1234567890" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.getValues()).toEqual({
      cnpj: "1234567890",
      password: "",
    });
  });

  it("should handle form submission", async () => {
    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      result.current.form.setValue("cnpj", "1234567890");
      result.current.form.setValue("password", "password123");
      await result.current.onSubmit();
    });

    expect(result.current.form.getValues()).toEqual({
      cnpj: "1234567890",
      password: "password123",
    });
  });
});
