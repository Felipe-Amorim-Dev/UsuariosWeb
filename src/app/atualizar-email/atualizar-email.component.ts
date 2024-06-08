import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-atualizar-email',
  templateUrl: './atualizar-email.component.html',
  styleUrls: ['./atualizar-email.component.css']
})
export class AtualizarEmailComponent implements OnInit {
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  formAlterarEmail = new FormGroup({
    email: new FormControl(''),
    novoEmail: new FormControl('')    
  })

  get form(): any {
    return this.formAlterarEmail.controls;
  }

  ngOnInit(): void {
    const auth = localStorage.getItem('auth_usuario');
    const data = JSON.parse(auth as string);
    this.formAlterarEmail.controls.email.setValue(data.email);
  }

  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    if (this.formAlterarEmail.value.email != this.formAlterarEmail.value.novoEmail) {
      this.spinner.show();

      const auth = localStorage.getItem('auth_usuario');
      const data = JSON.parse(auth as string);

      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + data.accessToken,
      });

      this.httpClient.put(environment.apiUsuarios + '/atualizar-email', this.formAlterarEmail.value, { headers: httpHeaders })
        .subscribe( response => {          
            this.mensagem_sucesso = `Parabéns ${data.nome}, seu email foi alterado com sucesso.`;
            this.formAlterarEmail.controls.novoEmail.setValue('');            
        })
        .add(() => {
          this.spinner.hide();
        });
    } else {
      this.mensagem_erro = 'Informe um email diferente do atual.';
    }
  }
}

