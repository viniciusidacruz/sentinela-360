export interface CnpjProviderInterface {
  validate(cnpj: string): Promise<boolean>;
}
