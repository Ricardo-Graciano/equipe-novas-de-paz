import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SongsService } from '../../songs.service';
import * as bootstrap from "bootstrap"

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: any[] = []
  pending: boolean = false

  constructor(
    private _SS: SongsService,
    private _FB: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loadSongs()
  }

  private async _loadSongs(){
    this._SS.get()
      .then((suc: any) => {
        this.songs = suc.songs
      })
  }

  redirectToAddNewSong(){
    this.router.navigate(["/songs/new"])
  }

  redirectToEditNewSong(songId: string){
    this.router.navigate(["/songs/edit"], {queryParams: {v: songId}})
  }
}
