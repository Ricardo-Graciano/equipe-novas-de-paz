import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

interface SongDTO {
  title: string;
  singer: string;
  key?: string;
  lyrics: string;
}

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  public base_url: string = '';

  constructor(
    public _AS: AppService, 
    private http: HttpClient,
    private _router: Router
  ) {
    this.base_url = `${this._AS.base_url}/songs`;
  }

  post(body: SongDTO): Promise<any> {
    return this.http
      .post(this.base_url, body, { headers: this._AS.basic_headers })
      .toPromise()
      .then((suc) => {
        this._AS.showToast('success', 'Música armazenada com sucesso!');
        this._router.navigate(["/songs"])
      })
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Erro ao armazenar música. ';
        this._AS.showToast('error', errorMessage);
      });
  }

  get() {
    return this.http
      .get(this.base_url, { headers: this._AS.basic_headers })
      .toPromise()
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Música não encontrada.';
        this._AS.showToast('error', errorMessage);
      });
  }
  
  getOne(_id: string) {
    const url = `${this.base_url}/${_id}`;
    return this.http
      .get(url, { headers: this._AS.basic_headers })
      .toPromise()
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Música não encontrada.';
        this._AS.showToast('error', errorMessage);
      });
  }

  put(_id: string, body: SongDTO) {
    const url = `${this.base_url}/${_id}`;
    return this.http
      .put(url, body, { headers: this._AS.basic_headers })
      .toPromise()
      .then((suc) => {
        this._AS.showToast('success', 'Música atualizada com sucesso!');
        this._router.navigate(["/songs"])
      })
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Erro ao atualizar música.';
        this._AS.showToast('error', errorMessage);
      });
  }

  delete(_id: string) {
    const url = `${this.base_url}/${_id}`;
    return this.http
      .delete(url, { headers: this._AS.basic_headers })
      .toPromise()
      .then((suc) => {
        this._AS.showToast('success', 'Música deletada com sucesso!');
        this._router.navigate(["/songs"])
      })
      .catch((err) => {
        const errorMessage = err.error?.error
          ? err.error?.error
          : 'Erro ao deletar música.';
        this._AS.showToast('error', errorMessage);
      });
  }
}
