import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Contas } from "app/apis/models/contas.model";
import { ContasService } from "app/apis/services/contas.service";
import { CONTAS_FORM_CONFIG } from "app/formularios/contas.form";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import Swal from "sweetalert2";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  @ViewChild("modalCriar", { static: true })
  cadastroTemplate: TemplateRef<HTMLDivElement>;

  contasCadastroForm: FormGroup;
  modalRef: BsModalRef;


  constructor(
    private readonly modalService: BsModalService,
    private readonly contasService: ContasService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contasCadastroForm = this.formBuilder.group(CONTAS_FORM_CONFIG);
  }

  cadastrarConta() {
    this.contasService.cadastrar(this.contasCadastroForm.value).subscribe((res) => {
      this.contasCadastroForm.reset();
      this.modalRef.hide();
      // this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  abrirModal(template: TemplateRef<HTMLDivElement>, tamanho: string): void {
    this.modalRef = this.modalService.show(template, { class: tamanho });

    // this.modalRef = this.modalService.show(this.cadastroTemplate, {class: "modal-dialog modal-lg modal-dialog modal-dialog-scrollable"})
  }
}
