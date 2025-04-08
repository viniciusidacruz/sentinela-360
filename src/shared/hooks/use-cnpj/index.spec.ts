import { useCnpj } from ".";

import { act, renderHook } from "@testing-library/react";

describe("useCnpj", () => {
  it("should be able to use cnpj formatted", async () => {
    const { result } = renderHook(() => useCnpj());

    let formattedCnpj = "";

    await act(async () => {
      formattedCnpj = result.current.formatCnpj("12345678901234");
    });

    expect(formattedCnpj).toBe("12.345.678/9012-34");
  });

  it("should be able to use cnpj validated", async () => {
    const { result } = renderHook(() => useCnpj());

    let isValid = false;

    await act(async () => {
      isValid = await result.current.validateCnpj("12345678000195");
    });

    expect(isValid).toBe(true);
  });
});
