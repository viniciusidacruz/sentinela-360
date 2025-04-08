export interface CNPJ {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Atividade[];
  qsa: Qsa[];
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
  status: string;
  complemento: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  atividades_secundarias: Atividade[];
  capital_social: string;
  simples: Simples;
  simei: Simei;
  billing: Billing;
}

export interface Atividade {
  code: string;
  text: string;
}

export interface Qsa {
  nome: string;
  qual: string;
}

export interface Simples {
  optante: boolean;
  data_opcao: any;
  data_exclusao: any;
  ultima_atualizacao: string;
}

export interface Simei {
  optante: boolean;
  data_opcao: any;
  data_exclusao: any;
  ultima_atualizacao: string;
}

export interface Billing {
  free: boolean;
  database: boolean;
}
