import { CnpjFactory } from "@/core/cnpj/factory/cnpj.factory";
import { InputFormatCnpjDto } from "@/core/cnpj/domain/usecases/format-cnpj/format-cnpj.dto";
import { FormatCnpjUseCase } from "@/core/cnpj/domain/usecases/format-cnpj/format-cnpj.usecase";

export const useCnpj = () => {
  const validateCnpj = async (cnpj: string): Promise<boolean> => {
    const cnpjFactory = CnpjFactory.create();
    const { isActive } = await cnpjFactory.execute({ cnpj });

    return isActive;
  };

  const formatCnpj = (cnpj: string): string => {
    const formatCnpjUseCase = new FormatCnpjUseCase();

    const input: InputFormatCnpjDto = {
      cnpj,
    };

    const output = formatCnpjUseCase.execute(input);

    return output.cnpj;
  };

  return { validateCnpj, formatCnpj };
};
