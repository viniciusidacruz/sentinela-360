import { CNPJ } from "./cnpj.entity";

describe("CNPJ", () => {
  it("should be able to create a cnpj", () => {
    const cnpj = new CNPJ("11222333000181");

    expect(cnpj.isValid()).toBe(true);
  });

  it("should be able to normalize a cnpj", () => {
    const cnpj = new CNPJ("1122v2333000181bb");

    expect(cnpj.normalize()).toBe("11222333000181");
  });

  it("should be able to format a cnpj", () => {
    const cnpj = new CNPJ("11222333000181");

    expect(cnpj.format()).toBe("11.222.333/0001-81");
  });

  it("should be able to format a cnpj", () => {
    const cnpj = new CNPJ("1234567890123/4");

    expect(cnpj.format()).toBe("12.345.678/9012-34");
  });
});
