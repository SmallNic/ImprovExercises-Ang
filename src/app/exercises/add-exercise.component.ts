import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'
import { Observable } from 'rxjs/Observable';
import { PageTitleService } from '../services/page-title.service'

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})

export class AddExerciseComponent implements OnInit {

  exercise:IExercise = {id: null, "warmup": false, "name": "", "description": ""};
  lastAddedExercise:IExercise;
  errorMessage:string;

  constructor(
    private _exerciseService: ExerciseService,
    private _pageTitleService: PageTitleService) {
      // this._pageTitleService.setPageTitle("Add Exercise");
      this._pageTitleService.setPageTitle("Add Exercise");

  }

  ngOnInit() {
  }

  submitExercise(){
    // Variable to hold a reference of addExercise/updateExercise
    let exerciseOperation:Observable<IExercise>;

    // Create a new exercise
    exerciseOperation = this._exerciseService.addExercise(this.exercise)

    // Subscribe to observable
    exerciseOperation.subscribe(
      lastAddedExercise => {
        this.lastAddedExercise = lastAddedExercise;
        this.exercise = {id:null, "warmup": false, "name": "", "description": ""};
      },
      err => {
        // Log errors if any
        console.log(err);
        this.errorMessage = <any>err;
      });
    }


  }
