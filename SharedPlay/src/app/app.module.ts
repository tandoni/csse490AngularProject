import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './+signin/signin.component';
import { HomeComponent } from './+home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { YoutubePlayerModule } from 'ng2-youtube-player';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { JoinplaylistComponent } from './+joinplaylist/joinplaylist.component';
import { AuthService } from "app/services/auth.service";
import { PlaylistService } from "app/services/playlist.service";
import { UserService } from "app/services/user.service";
import { PlaylistListComponent } from './+playlist-list/playlist-list.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { AuthGuard } from "./services/auth.guard";
// import {YouTubePlayer} from 'youtube-player';

export const MaterialModules = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    PlaylistComponent,
    JoinplaylistComponent,
    PlaylistListComponent,
    YoutubePlayerComponent,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    YoutubePlayerModule,
  ],
  providers: [AuthService, PlaylistService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
