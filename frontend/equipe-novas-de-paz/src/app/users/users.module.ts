import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginHeaderComponent } from './components/login-header/login-header.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateComponent,
    LoginHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    CreateComponent,
    LoginHeaderComponent
  ]
})
export class UsersModule { }
