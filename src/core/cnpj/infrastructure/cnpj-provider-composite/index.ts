import { CnpjProviderInterface } from "@/core/cnpj/domain/services/cnpj-service.interface";

export class CnpjProviderComposite implements CnpjProviderInterface {
  constructor(private readonly providers: CnpjProviderInterface[]) {}

  async validate(cnpj: string): Promise<boolean> {
    for (const provider of this.providers) {
      try {
        const result = await provider.validate(cnpj);
        if (typeof result === "boolean") {
          return result;
        }
      } catch (error) {
        console.warn(
          `[CNPJ Validator]: Falha ao usar ${provider.constructor.name}, tentando próximo.`
        );
        continue;
      }
    }

    throw new Error("Todos os provedores de CNPJ falharam");
  }
}
