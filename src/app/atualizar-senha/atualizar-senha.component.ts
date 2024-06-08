import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-atualizar-senha',
  templateUrl: './atualizar-senha.component.html',
  styleUrls: ['./atualizar-senha.component.css']
})
export class AtualizarSenhaComponent implements OnInit{

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  formAlterarSenha = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
    senhaConfirmacao: new FormControl('')
  })

  get form(): any {
    return this.formAlterarSenha.controls;
  }

  ngOnInit(): void {
    const auth = localStorage.getItem('auth_usuario');
    const data = JSON.parse(auth as string);
    this.formAlterarSenha.controls.email.setValue(data.email);
  }

  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    if (this.formAlterarSenha.value.senha == this.formAlterarSenha.value.senhaConfirmacao) {
      this.spinner.show();

      const auth = localStorage.getItem('auth_usuario');
      const data = JSON.parse(auth as string);

      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + data.accessToken,
      });

      this.httpClient.put(environment.apiUsuarios + '/atualizar-senha', this.formAlterarSenha.value, { headers: httpHeaders })
        .subscribe( response => {          
            this.mensagem_sucesso = `Parabéns ${data.nome}, sua senha foi alterada com sucesso.`;
            this.formAlterarSenha.controls.senha.setValue('');
            this.formAlterarSenha.controls.senhaConfirmacao.setValue('');          
        })
        .add(() => {
          this.spinner.hide();
        });
    } else {
      this.mensagem_erro = 'Senhas não conferem, por favor verifique.';
    }
  }
}
