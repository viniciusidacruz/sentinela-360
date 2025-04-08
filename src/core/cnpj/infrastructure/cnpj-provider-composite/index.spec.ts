import { CnpjProviderComposite } from ".";

const mockCnpjProvider = {
  validate: vi.fn().mockResolvedValue(true),
};

const mockCnpjProvider2 = {
  validate: vi.fn().mockResolvedValue(false),
};

const mockCnpjErrorProvider = {
  validate: vi
    .fn()
    .mockRejectedValue(new Error("Todos os provedores de CNPJ falharam")),
};

describe("CnpjProviderComposite", () => {
  it("should be able to create a cnpj provider composite", () => {
    const cnpjProviderComposite = new CnpjProviderComposite([mockCnpjProvider]);

    expect(cnpjProviderComposite).toBeDefined();
  });

  it("should be able to validate a cnpj", async () => {
    const cnpjProviderComposite = new CnpjProviderComposite([mockCnpjProvider]);

    const result = await cnpjProviderComposite.validate("12345678901234");

    expect(result).toBe(true);
  });

  it("should be able to validate a cnpj with multiple providers", async () => {
    const cnpjProviderComposite = new CnpjProviderComposite([
      mockCnpjProvider2,
    ]);

    const result = await cnpjProviderComposite.validate("12345678901234");

    expect(result).toBe(false);
  });

  it("should be return error if all providers fail", async () => {
    const cnpjProviderComposite = new CnpjProviderComposite([
      mockCnpjErrorProvider,
    ]);

    await expect(
      cnpjProviderComposite.validate("12345678901234")
    ).rejects.toThrow();
  });
});
