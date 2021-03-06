import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IExercise } from './exercise';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service'

@Injectable()

export class ExerciseService{

  constructor(
    private _http: HttpClient,
    private _userService: UserService){ }

  getExercises(): Observable<IExercise[]>{
    return this._http.get<IExercise[]>(environment.exercisesURL)
      .do(data => console.log( 'All:' + JSON.stringify(data) ))
      .catch(this.handleError);
  }

  getExercise(id:number): Observable<IExercise>{
    return this._http.get<IExercise>(`${environment.exercisesURL}/${id}`)
    .do(data => console.log( 'Exercise:' + JSON.stringify(data) ))
      .catch(this.handleError);
  }

  addExercise (exerciseData: Object, tagData: Object): Observable<IExercise> {
    exerciseData["user_id"] = this._userService.uid;
    // console.log("exerciseData", exerciseData)
    // console.log("tagData",tagData);
    let bodyString = JSON.stringify(exerciseData); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    let exerciseWithTags = {exercise:exerciseData, tags:tagData};

    return this._http.post(environment.exercisesURL, exerciseWithTags) // ...using post request
       .do((res:Response) => console.log("res:", res)) // ...and calling .json() on the response to return data
       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
}

  removeExercise (id:number): Observable<IExercise> {
    return this._http.delete(`${environment.exercisesURL}/${id}`) // ...using put request
      .do((res:Response) => console.log("res:", res)) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


  private handleError( err:HttpErrorResponse ){
    console.log( err.message );
    return Observable.throw( err.message );
  }
}
