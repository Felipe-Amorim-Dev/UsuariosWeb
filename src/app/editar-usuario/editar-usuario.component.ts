import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';
import { Genero } from '../enum-genero';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  generoEnum = Genero;
  selectedFile: File | null = null;
  form: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.form = new FormGroup({
      nome: new FormControl(''),
      sobrenome: new FormControl(''),      
      sexo: new FormControl(''),
      endereco: new FormControl(''),
      telefone: new FormControl('')
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    const auth = localStorage.getItem('auth_usuario');
    if (auth) {
      const data = JSON.parse(auth as string);
      this.form.patchValue({
        nome: data.nome,
        sobrenome: data.sobrenome,        
        sexo: data.sexo,
        endereco: data.endereco,
        telefone: data.telefone
      });
    }
  }

  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    const auth = localStorage.getItem('auth_usuario');
    if (!auth) {
      this.mensagem_erro = 'Erro: usuário não autenticado.';
      return;
    }

    const data = JSON.parse(auth as string);
    const formData = new FormData();    
    formData.append('nome', this.form.get('nome')?.value);
    formData.append('sobrenome', this.form.get('sobrenome')?.value);    
    formData.append('sexo', this.form.get('sexo')?.value);
    formData.append('endereco', this.form.get('endereco')?.value);
    formData.append('telefone', this.form.get('telefone')?.value);

    if (this.selectedFile != null) {
      formData.append('fotoPerfil', this.selectedFile);
    }

    this.spinner.show();

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + data.accessToken,
    });

    this.httpClient.put(environment.apiUsuarios + '/atualizar-dados', formData, { headers: httpHeaders })
      .subscribe(
        response => {
          this.mensagem_sucesso = `Parabéns ${this.form.get('nome')?.value} ${this.form.get('sobrenome')?.value}, dados atualizados com sucesso.`;

          // Atualiza os dados no localStorage
          const updatedData = { ...data, ...this.form.value };

          if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
              updatedData.fotoPerfil = reader.result;
              localStorage.setItem('auth_usuario', JSON.stringify(updatedData));
            };
            reader.readAsDataURL(this.selectedFile);
          } else {
            localStorage.setItem('auth_usuario', JSON.stringify(updatedData));
          }
        }
      ).add(() => {
        this.spinner.hide();
      });
  }
}