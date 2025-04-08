import { CNPJ } from "../../entities/cnpj.entity";
import { InputFormatCnpjDto, OutputFormatCnpjDto } from "./format-cnpj.dto";

export class FormatCnpjUseCase {
  execute(input: InputFormatCnpjDto): OutputFormatCnpjDto {
    const cnpj = new CNPJ(input.cnpj);

    if (!cnpj.isValid()) {
      return input;
    }

    return {
      cnpj: cnpj.format(),
    };
  }
}
