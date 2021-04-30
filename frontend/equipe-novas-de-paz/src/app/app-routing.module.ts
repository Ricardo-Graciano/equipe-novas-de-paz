import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSongsComponent } from './songs/components/form-songs/form-songs.component';
import { SongsComponent } from './songs/components/songs/songs.component';

const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full'},
  {
    path: 'songs',
    children: [
      { path: '', component: SongsComponent },
      { path: 'new', component: FormSongsComponent },
      { path: 'edit', component: FormSongsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
