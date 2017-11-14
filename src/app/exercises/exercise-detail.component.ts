import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ExerciseService } from './exercise.service';
import { IExercise } from './exercise';

@Component({
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent implements OnInit {

  exercise: IExercise;
  errorMessage: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService) {
  }


  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getExercise(id);
  }

  getExercise(id: number){
    this._exerciseService.getExercise(id).subscribe(
      exercise => this.exercise = exercise,
      error => this.errorMessage = <any>error)
  }

  deleteExercise(id:number) {
    console.log("exercise id",id)

    let exerciseOperation:Observable<IExercise>;
    // Call removeComment() from CommentService to delete comment
    exerciseOperation = this._exerciseService.removeExercise(id)

    exerciseOperation.subscribe(
      deletedExercise => {
        console.log("deletedExercise", deletedExercise)
        // this.deletedExercise = deletedExercise;
        // this.removeDeletedExercise(deletedExercise);
        this._router.navigateByUrl('/exercises')
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

}
