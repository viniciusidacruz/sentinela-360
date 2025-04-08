import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ReceitawsProvider } from "./receitaws.provider";

describe("ReceitawsProvider", () => {
  let mockAxios: MockAdapter;
  let provider: ReceitawsProvider;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    provider = new ReceitawsProvider();
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("should return true when CNPJ is active", async () => {
    const mockCnpj = "12345678000195";
    const mockResponse = {
      situacao: "ATIVA",
    };

    mockAxios
      .onGet(`https://www.receitaws.com.br/v1/cnpj/${mockCnpj}`)
      .reply(200, mockResponse);

    const result = await provider.validate(mockCnpj);
    expect(result).toBe(true);
  });

  it("should return false when CNPJ is inactive", async () => {
    const mockCnpj = "12345678000195";
    const mockResponse = null;

    mockAxios
      .onGet(`https://www.receitaws.com.br/v1/cnpj/${mockCnpj}`)
      .reply(200, mockResponse);

    const result = await provider.validate(mockCnpj);
    expect(result).toBe(false);
  });

  it("should throw error when Receitaws is unavailable", async () => {
    const mockCnpj = "12345678000195";

    mockAxios
      .onGet(`https://www.receitaws.com.br/v1/cnpj/${mockCnpj}`)
      .reply(500);

    await expect(provider.validate(mockCnpj)).rejects.toThrow(
      "Receitaws indisponível"
    );
  });
});
