import { act, renderHook } from "@testing-library/react";

import { useSignIn } from "../use-sign-in";

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
      email: "",
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

  it("should handle form submission", async () => {
    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      result.current.form.setValue("email", "exemplo@email.com");
      result.current.form.setValue("password", "password123");
      await result.current.onSubmit();
    });

    expect(result.current.form.getValues()).toEqual({
      email: "exemplo@email.com",
      password: "password123",
    });
  });
});
