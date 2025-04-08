import { act, renderHook } from "@testing-library/react";

import { useSignIn } from "../data-handler";

describe("useSignIn", () => {
  it("should render default values of form", () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.form.getValues()).toEqual({
      cnpj: "",
      password: "",
    });

    expect(result.current.showPassword).toBe(false);
  });

  it("should toggle password visibility", async () => {
    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      result.current.toggleVisibilityPassword();
    });

    expect(result.current.showPassword).toBe(true);
  });
});
