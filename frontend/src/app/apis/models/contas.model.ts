export class Contas {
  _id: String;
  Descricao: string;
  Valor: string;
  DataVencimento: string;
  Status: string;
  User?: string;
  UserName?: string;

  constructor(params: Partial<Contas>
  ) {
    this._id = params._id;
    this.Descricao = params.Descricao;
    this.Valor = params.Valor;
    this.DataVencimento = params.DataVencimento;
    this.Status = params.Status;
    this.User = params.User || null;
    this.UserName = params.UserName || null;
  }
}
