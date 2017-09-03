import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';
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

  addExercise (body: Object): Observable<IExercise[]> {
    console.log("body",body)
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

    return this._http.post(this._exerciseUrl, body) // ...using post request
                     .do((res:Response) => console.log("res:", res)) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
}

  private handleError( err:HttpErrorResponse ){
    console.log( err.message );
    return Observable.throw( err.message );
  }
}
