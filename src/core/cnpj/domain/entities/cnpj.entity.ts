export class CNPJ {
  constructor(private readonly value: string) {}

  isValid(): boolean {
    const numericValue = this.normalize();

    return numericValue.length === 14;
  }

  normalize(): string {
    return this.value.replace(/\D/g, "");
  }

  format(): string {
    const numericValue = this.normalize();

    if (numericValue.length !== 14) return numericValue;

    return numericValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
}
