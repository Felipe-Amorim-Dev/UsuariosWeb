import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';
import { Genero } from '../enum-genero';

@Component({
  selector: 'app-cadastra-usuario',
  templateUrl: './cadastra-usuario.component.html',
  styleUrls: ['./cadastra-usuario.component.css']
})
export class CadastraUsuarioComponent {

  mensagem_Sucesso: string = '';
  mensagem_Error: string = '';
  generoEnum = Genero;
  selectedFile: File | null = null;
  model: any = {};

  constructor(    
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {         
      const formData = new FormData();
      formData.append('fotoPerfil', this.selectedFile || '');
      formData.append('nome', this.model.nome);
      formData.append('sobrenome', this.model.sobrenome);
      formData.append('email', this.model.email);
      formData.append('senha', this.model.senha);
      formData.append('senhaConfirmacao', this.model.senhaConfirmacao);
      formData.append('dataNascimento', this.model.dataNascimento);
      formData.append('sexo', this.model.sexo);
      formData.append('endereco', this.model.endereco);
      formData.append('telefone', this.model.telefone);
      
      this.spinner.show();

      this.http.post(environment.apiUsuarios + '/criar-conta', formData)
        .subscribe(response => {
          this.mensagem_Sucesso = `Conta ${this.model.nome}, Criada com sucesso.`;
          console.log(response);
        }).add(() => {
          this.spinner.hide();
        });
    }   
}