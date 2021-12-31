import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-cadastro-contas-modal',
  templateUrl: './cadastro-contas-modal.component.html',
  styleUrls: ['./cadastro-contas-modal.component.css']
})
export class CadastroContasModalComponent implements OnInit {
  @Input() modalReferencia: BsModalRef;
  @Input() formulario: FormGroup;
  @Input() tituloModal: string;
  @Output() onSalvar = new EventEmitter();
  bloquearSalvar = false;

  constructor() { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.bloquearSalvar = true;
    this.onSalvar.emit();
  }

  limparForm(): void {
    this.modalReferencia.hide();
    this.formulario.reset();
  }

}
