import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'
import { Observable } from 'rxjs/Observable';
import { PageTitleService } from '../services/page-title.service'

@Component({
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})

export class ExerciseListComponent implements OnInit {
  pageTitle: string='All Exercises';
  errorMessage: string;
  deletedExercise: IExercise;

  exercises: IExercise[] = [];

  constructor(
    private _exerciseService: ExerciseService,
    private _pageTitleService: PageTitleService ) {
      // this._pageTitleService.setPageTitle("All Exercises");
      this._pageTitleService.setPageTitle('All Exercises');
  }

  ngOnInit():void {
    this._exerciseService.getExercises()
      .subscribe(
        exercises => this.exercises = exercises,
        error => this.errorMessage = <any>error);
  }

  deleteExercise(id:number) {
    console.log("exercise id",id)

    let exerciseOperation:Observable<IExercise>;
    // Call removeComment() from CommentService to delete comment
    exerciseOperation = this._exerciseService.removeExercise(id)

    exerciseOperation.subscribe(
      deletedExercise => {
        console.log("deletedExercise", deletedExercise)
        this.deletedExercise = deletedExercise;
        this.removeDeletedExercise(deletedExercise);
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

  removeDeletedExercise(deletedExercise: IExercise): void {
    console.log("removeDeletedExercise")
    console.log("deletedExercise", deletedExercise);
    console.log("exercises:", this.exercises);
    this.exercises = this.exercises.filter(obj => obj.id !== deletedExercise.id);
    console.log("exercises:", this.exercises);
  }

}
