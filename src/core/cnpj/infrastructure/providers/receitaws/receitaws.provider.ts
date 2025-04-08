import axios from "axios";

import { CnpjProviderInterface } from "@/core/cnpj/domain/services/cnpj-service.interface";

export class ReceitawsProvider implements CnpjProviderInterface {
  async validate(cnpj: string): Promise<boolean> {
    try {
      const { data } = await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      );

      return data !== null;
    } catch (error) {
      throw new Error("Receitaws indisponível");
    }
  }
}
