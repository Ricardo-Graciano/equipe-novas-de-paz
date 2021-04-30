import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../songs.service';

@Component({
  selector: 'app-form-songs',
  templateUrl: './form-songs.component.html',
  styleUrls: ['./form-songs.component.css']
})
export class FormSongsComponent implements OnInit {

  formSong: FormGroup
  isEditingPage: boolean = false
  savePending: boolean = false
  deletePending: boolean = false

  constructor(
    private _SS: SongsService,
    private _FB: FormBuilder,
    private _activeRoute: ActivatedRoute
  ) {
    this.formSong = this._FB.group({
      _id: [],
      title: [],
      singer: [],
      key: [],
      lyrics: []
    })
  }

  ngOnInit(): void {
    this.isEditingPage = window.location.href.includes("edit")
    if(this.isEditingPage){
      this._loadSongToEdit()
    }
  }

  async _loadSongToEdit(){
    const songId : string | null = this._activeRoute.snapshot.queryParamMap.get('v');
    this._SS.getOne(String(songId))
      .then((suc: any) => {
        this.formSong.patchValue(suc.song)
      })
  }

  handleSaveBtnClick(){
    if(this.formSong.value._id) this.updateSong()
    else this.saveSong()
  }

  private async saveSong(){
    this.savePending = true
    await this._SS.post(this.formSong.value)
    this.savePending = false
  }

  private async updateSong(){
    this.savePending = true
    const body = {... this.formSong.value}
    const {_id} = body
    delete body._id
    await this._SS.put(_id, body)
    this.savePending = false
  }

  async handleDeleteBtnClick(){
      this.deletePending = true
      await this._SS.delete(this.formSong.value._id)
      this.deletePending = false
    }
}
