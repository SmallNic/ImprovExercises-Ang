import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'

@Component({
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.sass']
})

export class ExerciseListComponent implements OnInit {
  pageTitle: string='All Exercises';
  errorMessage: string;

  exercises: IExercise[] = [];

  constructor(private _exerciseService: ExerciseService) { }

  ngOnInit():void {
    this._exerciseService.getExercises()
      .subscribe(
        exercises => this.exercises = exercises,
        error => this.errorMessage = <any>error);
  }

}
