import { formatCnpj } from "../format-cnpj";

describe("formatCnpj", () => {
  it("should format a valid CNPJ", () => {
    const formatted = formatCnpj("12345678901234");

    expect(formatted).toBe("12.345.678/9012-34");
  });

  it("should return an empty string if the value is null", () => {
    const formatted = formatCnpj(null);

    expect(formatted).toBe("");
  });

  it("should return an empty string if the value is undefined", () => {
    const formatted = formatCnpj(undefined);

    expect(formatted).toBe("");
  });
});
