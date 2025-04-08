import { InputFormatCnpjDto } from "./format-cnpj.dto";
import { FormatCnpjUseCase } from "./format-cnpj.usecase";

describe("FormatCnpjUseCase", () => {
  it("should be able to format a cnpj", () => {
    const formatCnpjUseCase = new FormatCnpjUseCase();

    const input: InputFormatCnpjDto = {
      cnpj: "12345678901234",
    };

    const output = formatCnpjUseCase.execute(input);

    expect(output).toEqual({ cnpj: "12.345.678/9012-34" });
  });
});
