import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastraUsuarioComponent } from './cadastra-usuario/cadastra-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AtualizarSenhaComponent } from './atualizar-senha/atualizar-senha.component';
import { AtualizarEmailComponent } from './atualizar-email/atualizar-email.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar-usuario', component: CadastraUsuarioComponent},
  {path: 'editar-usuario', component: EditarUsuarioComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'atualizar-senha', component: AtualizarSenhaComponent},
  {path: 'atualizar-email', component: AtualizarEmailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastraUsuarioComponent,
    EditarUsuarioComponent,
    NavbarComponent,
    FooterComponent,
    PerfilComponent,
    AtualizarSenhaComponent,
    AtualizarEmailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
