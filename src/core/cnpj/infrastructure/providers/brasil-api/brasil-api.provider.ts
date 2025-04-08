import axios from "axios";

import { CnpjProviderInterface } from "@/core/cnpj/domain/services/cnpj-service.interface";

export class BrasilApiProvider implements CnpjProviderInterface {
  async validate(cnpj: string): Promise<boolean> {
    try {
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
      );

      return data !== null;
    } catch (error) {
      throw new Error("BrasilAPI indisponível");
    }
  }
}
