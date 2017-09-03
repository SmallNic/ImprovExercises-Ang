import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})

export class AddExerciseComponent implements OnInit {

  exercise:IExercise = {"warmup": false, "name": "", "description": ""};
  lastAddedExercise:IExercise;
  errorMessage:string;

  constructor(private _exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  submitExercise(){
    // Variable to hold a reference of addExercise/updateExercise
    let exerciseOperation:Observable<IExercise[]>;

    // Create a new exercise
    exerciseOperation = this._exerciseService.addExercise(this.exercise)

    // Subscribe to observable
    exerciseOperation.subscribe(
      lastAddedExercise => {
        this.lastAddedExercise = this.exercise;
        this.exercise = {"warmup": false, "name": "", "description": ""};
      },
      err => {
        // Log errors if any
        console.log(err);
        this.errorMessage = <any>err;
      });
    }


  }
