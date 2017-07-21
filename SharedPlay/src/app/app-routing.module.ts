import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/+home/home.component";
import { SigninComponent } from "app/+signin/signin.component";
import { PlaylistComponent } from "app/+playlist/playlist.component";
import { JoinplaylistComponent } from "app/+joinplaylist/joinplaylist.component";

const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: '', component: SigninComponent },
  { path: 'activeplaylist', component: PlaylistComponent },
  { path: 'joinplaylist', component: JoinplaylistComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
