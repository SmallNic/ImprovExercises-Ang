import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'
import { Observable } from 'rxjs/Observable';
import { PageTitleService } from '../services/page-title.service'
import { Angular2TokenService } from 'angular2-token';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})

export class AddExerciseComponent implements OnInit {

  exercise:IExercise = {id: null, "name": "", "description": "", "purpose":"", "tags":[]};
  tags:any[] = [];
  lastAddedExercise:IExercise;
  errorMessage:string;
  defaults: string[] = ["Relationship","Physicality","Emotions", "Warmup"];

  constructor(
    private _exerciseService: ExerciseService,
    private _pageTitleService: PageTitleService,
    private _router:Router,
    public tokenAuthService:Angular2TokenService) {
      // this._pageTitleService.setPageTitle("Add Exercise");
      this._pageTitleService.setPageTitle("Add Exercise");
      if (!this.tokenAuthService.userSignedIn()){
        this._router.navigate(['/exercises']);
      }
  }

  ngOnInit() {
  }

  submitExercise(){
    // Variable to hold a reference of addExercise/updateExercise
    let exerciseOperation:Observable<IExercise>;

    // Create a new exercise
    exerciseOperation = this._exerciseService.addExercise(this.exercise, this.tags)
    // Subscribe to observable
    exerciseOperation.subscribe(
      lastAddedExercise => {
        this.lastAddedExercise = lastAddedExercise;
        this.exercise = {id:null, "name": "", "description": "", "purpose":"", "tags":[]};
        this.tags = [];
      },
      err => {
        // Log errors if any
        console.log(err);
        this.errorMessage = <any>err;
      });
    }


  }
