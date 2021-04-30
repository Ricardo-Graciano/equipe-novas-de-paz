import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../users.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formCreationUser: FormGroup
  pending: boolean = false

  constructor(
    private _US: UsersService,
    private _FB: FormBuilder
  ) { 
    this.formCreationUser = this._FB.group({
      name: [],
      email: [],
      password: [],
      passwordConfirmation: []
    })
  }

  ngOnInit(): void {

  }

  async handleSaveBtnClick(){
    if(!this._doesPasswordsMatch()) return;

    this.pending = true
    await this._US.createUser(this.formCreationUser.value)
      .then(suc => {
        $("#signUpModal").click()
        $("#loginBtn").click()
      })
    this.pending = false
  }

  private _doesPasswordsMatch(){
    return this.formCreationUser.value.password == this.formCreationUser.value.passwordConfirmation
  }

}
