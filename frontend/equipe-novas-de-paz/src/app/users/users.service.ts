import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  base_url: string;
  private loggedUser: any = {};

  constructor(private _AS: AppService, private http: HttpClient) {
    this.base_url = `${this._AS.base_url}/users`;
  }

  isUserLogged() {
    return !!this.loggedUser.email;
  }

  getUserName() {
    return this.loggedUser.email;
  }

  createUser(body: any): Promise<any> {
    return this.http
      .post(this.base_url, body, { headers: this._AS.basic_headers })
      .toPromise()
      .then((suc) => {
        this._AS.showToast('success', 'Usuário cadastrado com sucesso!');
      })
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Erro ao cadastrar usuário.';
        this._AS.showToast('error', errorMessage);
      });
  }

  login(body: any): Promise<any> {
    const url = `${this._AS.base_url}/login`;
    return this.http
      .post(url, body, { headers: this._AS.basic_headers })
      .toPromise()
      .then((suc: any) => {
        if (suc.token) {
          this._AS.basic_headers = new HttpHeaders().append(
            'Authorization',
            `Bearer ${suc.token}`
          );
          this.loggedUser = suc.user;
          this._AS.showToast('success', 'Login realizado com sucesso!');
        }
        return suc;
      })
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Erro ao fazer login.';
        this._AS.showToast('error', errorMessage);
        return err;
      });
  }

  logout(): void {
    this._AS.basic_headers = new HttpHeaders();
    this.loggedUser = {};
  }
}
