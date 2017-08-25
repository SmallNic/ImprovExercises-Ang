import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IExercise } from './exercise';

@Injectable()

export class ExerciseService{

  private _exerciseUrl = 'http://localhost:3000/exercises.json'

  constructor(private _http: HttpClient){ }

  getExercises(): Observable<IExercise[]>{
    return this._http.get<IExercise[]>(this._exerciseUrl)
      .do(data => console.log( 'All:' + JSON.stringify(data) ))
      .catch(this.handleError);
  }

  private handleError( err:HttpErrorResponse ){
    console.log( err.message );
    return Observable.throw( err.message );
  }
}
