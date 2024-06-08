import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mensagem_Sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}
  
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('')
  });

  get form(): any {
    return this.formLogin.controls;
  }
  
  onSubmit(): void {
    this.mensagem_erro = '';
    this.spinner.show();

    this.httpClient
      .post(environment.apiUsuarios + '/autenticar', this.formLogin.value)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('auth_usuario', JSON.stringify(data));          
          window.location.href = '/perfil';
        },
        error: (e) => {
          this.mensagem_erro = e.error.message;
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}
