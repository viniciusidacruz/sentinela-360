import { CnpjProviderInterface } from "../../services/cnpj-service.interface";
import { InputCheckCnpjDto } from "./check-cnpj.dto";
import { CheckCnpjUseCase } from "./check-cnpj.usecase";

const input: InputCheckCnpjDto = {
  cnpj: "12345678901234",
};

const MockRepository = (): CnpjProviderInterface => {
  return {
    validate: vi.fn().mockResolvedValue(true),
  };
};

describe("CheckCnpjUseCase", () => {
  it("should be able to check a cnpj", async () => {
    const checkCnpjUseCase = new CheckCnpjUseCase(MockRepository());

    const output = await checkCnpjUseCase.execute(input);

    expect(output).toEqual({ isActive: true });
  });
});
