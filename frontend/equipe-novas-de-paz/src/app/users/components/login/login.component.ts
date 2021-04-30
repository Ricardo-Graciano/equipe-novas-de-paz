import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../users.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser: FormGroup
  pending: boolean = false

  constructor(
    private _US: UsersService,
    private _FB: FormBuilder
  ) {
    this.formUser = this._FB.group({
      email: [],
      password: []
    })
  }

  ngOnInit(): void {
  }

  async handleBtnClick(){
    this.pending = true
    await this._US.login(this.formUser.value)
      .then(suc => {
        if(suc.token){
          $("#loginModal").click()
          this.formUser.reset()
        }
      })
    this.pending = false
  }
}
