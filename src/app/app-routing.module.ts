import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail.component';
import { AddExerciseComponent } from './exercises/add-exercise.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'exercises/:id', component: ExerciseDetailComponent },
  { path: 'add-exercise', component: AddExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
