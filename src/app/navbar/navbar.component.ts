import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAuthenticated: boolean = false;

  nomeUsuario: string = '';
  emailUsuario: string = '';

  ngOnInit(): void {
    const data = localStorage.getItem('auth_usuario');
    if(data != null){
      this.isAuthenticated = true;
      this.nomeUsuario = JSON.parse(data).nome;
      this.emailUsuario = JSON.parse(data).email;
    }
  }

  logout(): void{
    if(window.confirm('Deseja realmente sair do sistema?')){
      localStorage.removeItem('auth_usuario');
      window.location.href = "";
    }
  }
}
