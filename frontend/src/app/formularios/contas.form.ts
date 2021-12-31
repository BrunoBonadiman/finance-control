import { Validators } from "@angular/forms";

export const CONTAS_FORM_CONFIG = {
  _id: [""],
  Descricao: ["", Validators.required],
  Valor: ["", Validators.required],
  DataVencimento: ["", Validators.required],
  Status: ["", Validators.required],
}
