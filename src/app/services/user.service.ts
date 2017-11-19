import {Injectable} from '@angular/core';

@Injectable()

export class UserService {
  private _uid: number

  constructor(){    }

  set uid(value){
    this._uid = value;
  }
  
  get uid(){
    return this._uid
  }
}
