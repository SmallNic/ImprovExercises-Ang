import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ExerciseService } from './exercise.service';
import { IExercise } from './exercise';

@Component({
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.sass']
})
export class ExerciseDetailComponent implements OnInit {

  exercise: IExercise;
  errorMessage: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getExercise(id);
  }

  getExercise(id: number){
    this._exerciseService.getExercise(id).subscribe(
      exercise => this.exercise = exercise,
      error => this.errorMessage = <any>error)
  }

}
