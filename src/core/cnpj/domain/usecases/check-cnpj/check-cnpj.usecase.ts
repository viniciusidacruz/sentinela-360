import { CNPJ } from "../../entities/cnpj.entity";
import { InputCheckCnpjDto, OutputCheckCnpjDto } from "./check-cnpj.dto";
import { CnpjProviderInterface } from "../../services/cnpj-service.interface";

export class CheckCnpjUseCase {
  constructor(private readonly provider: CnpjProviderInterface) {}

  async execute(input: InputCheckCnpjDto): Promise<OutputCheckCnpjDto> {
    const cnpj = new CNPJ(input.cnpj);

    if (!cnpj.isValid()) {
      return { isActive: false };
    }

    const isActive = await this.provider.validate(cnpj.normalize());

    return { isActive };
  }
}
