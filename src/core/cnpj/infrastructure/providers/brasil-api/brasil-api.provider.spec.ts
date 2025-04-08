import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrasilApiProvider } from "./brasil-api.provider";

describe("BrasilApiProvider", () => {
  let mockAxios: MockAdapter;
  let provider: BrasilApiProvider;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    provider = new BrasilApiProvider();
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("should return true when CNPJ is active", async () => {
    const mockCnpj = "12345678000195";
    const mockResponse = {
      descricao_situacao_cadastral: "ATIVA",
    };

    mockAxios
      .onGet(`https://brasilapi.com.br/api/cnpj/v1/${mockCnpj}`)
      .reply(200, mockResponse);

    const result = await provider.validate(mockCnpj);
    expect(result).toBe(true);
  });

  it("should return false when CNPJ is inactive", async () => {
    const mockCnpj = "12345678000195";
    const mockResponse = null;

    mockAxios
      .onGet(`https://brasilapi.com.br/api/cnpj/v1/${mockCnpj}`)
      .reply(200, mockResponse);

    const result = await provider.validate(mockCnpj);
    expect(result).toBe(false);
  });

  it("should throw error when BrasilAPI is unavailable", async () => {
    const mockCnpj = "12345678000195";

    mockAxios
      .onGet(`https://brasilapi.com.br/api/cnpj/v1/${mockCnpj}`)
      .reply(500);

    await expect(provider.validate(mockCnpj)).rejects.toThrow(
      "BrasilAPI indisponível"
    );
  });
});
