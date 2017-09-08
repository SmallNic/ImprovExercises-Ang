import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { AddExerciseComponent } from './exercises/add-exercise.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail.component'; // this is needed!

// Services
import { Angular2TokenService } from 'angular2-token';
import { PageTitleService } from './services/page-title.service'

// ng2 Tag
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ExerciseListComponent,
    AddExerciseComponent,
    ExerciseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterializeModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [ Angular2TokenService, PageTitleService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
