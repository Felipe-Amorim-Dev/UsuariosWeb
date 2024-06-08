import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit { 
  isAuthenticated: boolean = false;

  nomeUsuario: string = '';
  sobrenomeUsuario: string = '';
  emailUsuario: string = '';
  dataNascimentoUsuario: string = '';
  sexoUsuario: string = '';
  enderecoUsuario: string = '';
  telefoneUsuario: string = '';  
  fotoPerfilUsuario: string = '';


  ngOnInit(): void {
    const data = localStorage.getItem('auth_usuario');
    if(data != null){
      this.isAuthenticated = true;
      const userData = JSON.parse(data);
      this.nomeUsuario = JSON.parse(data).nome;
      this.sobrenomeUsuario = JSON.parse(data).sobrenome;
      this.emailUsuario = JSON.parse(data).email;
      this.dataNascimentoUsuario = JSON.parse(data).dataNascimento;
      this.sexoUsuario = JSON.parse(data).sexo;
      this.enderecoUsuario = JSON.parse(data).endereco;
      this.telefoneUsuario = JSON.parse(data).telefone;
      this.fotoPerfilUsuario = `data:image/jpeg;base64,${userData.fotoPerfil}`;
    }
  }

  }

