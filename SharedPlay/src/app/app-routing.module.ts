import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/+home/home.component";
import { SigninComponent } from "app/+signin/signin.component";
import { PlaylistComponent } from "app/playlist/playlist.component";
import { JoinplaylistComponent } from "app/+joinplaylist/joinplaylist.component";
import { PlaylistListComponent } from "app/+playlist-list/playlist-list.component";
import { AuthGuard } from "app/services/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'activeplaylist/:active', component: PlaylistListComponent, canActivate: [AuthGuard] },
  { path: 'joinplaylist', component: JoinplaylistComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
