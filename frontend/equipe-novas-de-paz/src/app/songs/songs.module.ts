import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './components/songs/songs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSongsComponent } from './components/form-songs/form-songs.component';

@NgModule({
  declarations: [
    SongsComponent,
    FormSongsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SongsComponent
  ]
})
export class SongsModule { }
