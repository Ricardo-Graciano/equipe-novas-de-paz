import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  public base_url: string = "http://localhost:5001/equipe-novas-de-paz/us-central1/app"
  public basic_headers: HttpHeaders = new HttpHeaders()

  constructor(
    private _toastService: ToastrService
  ) { }

  showToast(type: "error" | "info" | "success" | "warning", title?: string, message?: string, options?: any) {
    this._toastService.show(message, title, options, `toast-${type}`)
  }
}
