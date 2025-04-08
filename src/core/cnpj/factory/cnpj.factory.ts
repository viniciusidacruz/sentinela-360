import { CheckCnpjUseCase } from "../domain/usecases/check-cnpj/check-cnpj.usecase";

import { CnpjProviderComposite } from "@/core/cnpj/infrastructure/cnpj-provider-composite";
import { ReceitawsProvider } from "@/core/cnpj/infrastructure/providers/receitaws/receitaws.provider";
import { BrasilApiProvider } from "@/core/cnpj/infrastructure/providers/brasil-api/brasil-api.provider";

export class CnpjFactory {
  static create(): CheckCnpjUseCase {
    const validatorComposite = new CnpjProviderComposite([
      new BrasilApiProvider(),
      new ReceitawsProvider(),
    ]);

    return new CheckCnpjUseCase(validatorComposite);
  }
}
